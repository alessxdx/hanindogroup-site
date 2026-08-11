#!/usr/bin/env perl
# =====================================================================
# Hanindo Group — PEI certificate PDF to SVG
#
#   perl tools/pei-cert.pl in.pdf out.svg
#
# PEI issues the membership certificate as a PDF once a year. The other
# certificates on the Citra About page are photographs, so the card there
# wants an image; this makes one without a PDF rasteriser, which no
# machine here has. Run it when the next year's certificate arrives and
# point the card at the new file.
#
# It is a re-lay, not a re-render: the four raster pieces come out of the
# PDF untouched and go back at the coordinates the PDF itself places them,
# so the only thing that can drift is the two text runs, which are redrawn
# in the nearest web-safe stand-in for the PDF's Helvetica and Times.
# =====================================================================
use strict;
use warnings;
use Compress::Zlib;
use MIME::Base64 qw(encode_base64);

#
# The PDF draws four raster pieces plus two live text runs onto a 612x792
# page. Every piece is placed by a cm matrix whose scale is exactly 3/4 of
# the image's pixel size, so rendering the page at 4/3 puts each raster at
# its native resolution -- no resampling, and the only things that need
# redrawing are the two text runs.
my $PDF = shift or die "usage: pei.pl in.pdf out.svg\n";
my $OUT = shift or die "usage: pei.pl in.pdf out.svg\n";

open my $fh, '<:raw', $PDF or die $!;
local $/;
my $doc = <$fh>;
close $fh;

# --- pull each image object out of the file -------------------------------
my %obj;
while ($doc =~ /(\d+)\s+0\s+obj\s*<<(.*?)>>\s*stream\r?\n(.*?)\r?\nendstream/gs) {
  my ($n, $dict, $raw) = ($1, $2, $3);
  next unless $dict =~ m{/Subtype\s*/Image};
  $obj{$n} = { dict => $dict, raw => $raw };
}

# A PDF literal string, with the escapes undone. Needed for the palettes,
# which are raw RGB bytes wrapped in ( ).
sub pdf_string {
  my ($s, $from) = @_;
  my $i = index($s, '(', $from);
  return undef if $i < 0;
  my ($depth, $out) = (1, '');
  $i++;
  while ($i < length $s) {
    my $c = substr($s, $i, 1);
    if ($c eq "\\") {
      my $d = substr($s, $i + 1, 1);
      if ($d =~ /[0-7]/) {
        my ($oct) = substr($s, $i + 1) =~ /^([0-7]{1,3})/;
        $out .= chr(oct($oct) & 0xFF);
        $i += 1 + length $oct;
        next;
      }
      my %esc = (n => "\n", r => "\r", t => "\t", b => "\b", f => "\f");
      $out .= exists $esc{$d} ? $esc{$d} : $d;
      $i += 2;
      next;
    }
    if ($c eq '(') { $depth++; $out .= $c; $i++; next }
    if ($c eq ')') { $depth--; last if $depth == 0; $out .= $c; $i++; next }
    $out .= $c;
    $i++;
  }
  return $out;
}

sub png_chunk {
  my ($type, $data) = @_;
  return pack('N', length $data) . $type . $data . pack('N', crc32($type . $data));
}

# Indexed-palette image. The PDF predictor is PNG predictor 15 with one
# 8-bit component, which is byte-for-byte what PNG IDAT already expects,
# so the inflated stream goes straight through as scanlines.
sub png_indexed {
  my ($n) = @_;
  my $o = $obj{$n} or die "no obj $n";
  my ($w) = $o->{dict} =~ m{/Width\s+(\d+)};
  my ($h) = $o->{dict} =~ m{/Height\s+(\d+)};
  my $pal = pdf_string($o->{dict}, index($o->{dict}, '/ColorSpace'));
  die "obj $n: no palette" unless defined $pal;
  my $scan = Compress::Zlib::uncompress($o->{raw}) // die "obj $n inflate";
  die "obj $n: scanline size" unless length($scan) == $h * ($w + 1);
  my $png = "\x89PNG\r\n\x1a\n";
  $png .= png_chunk('IHDR', pack('NNCCCCC', $w, $h, 8, 3, 0, 0, 0));
  $png .= png_chunk('PLTE', $pal);
  $png .= png_chunk('IDAT', Compress::Zlib::compress($scan));
  $png .= png_chunk('IEND', '');
  return ($png, $w, $h);
}

# Grayscale image plus its soft mask, merged into one gray+alpha PNG.
sub png_gray_alpha {
  my ($gn, $an) = @_;
  my ($w) = $obj{$gn}{dict} =~ m{/Width\s+(\d+)};
  my ($h) = $obj{$gn}{dict} =~ m{/Height\s+(\d+)};
  my $g = Compress::Zlib::uncompress($obj{$gn}{raw}) // die "gray inflate";
  my $a = Compress::Zlib::uncompress($obj{$an}{raw}) // die "alpha inflate";
  die "size mismatch" unless length($g) >= $w * $h && length($a) >= $w * $h;
  my $rows = '';
  for my $y (0 .. $h - 1) {
    my $row = "\0";
    my $go = $y * $w;
    for my $x (0 .. $w - 1) {
      $row .= substr($g, $go + $x, 1) . substr($a, $go + $x, 1);
    }
    $rows .= $row;
  }
  my $png = "\x89PNG\r\n\x1a\n";
  $png .= png_chunk('IHDR', pack('NNCCCCC', $w, $h, 8, 4, 0, 0, 0));
  $png .= png_chunk('IDAT', Compress::Zlib::compress($rows));
  $png .= png_chunk('IEND', '');
  return ($png, $w, $h);
}

sub uri { 'data:image/png;base64,' . encode_base64($_[0], '') }

my ($p0) = png_indexed(2);   # tall band down the left of the page
my ($p1) = png_indexed(3);   # PEI wordmark across the top
my ($p2) = png_indexed(5);   # rule under the year
my ($p4) = png_gray_alpha(8, 7);  # body text, signature and blurb

# Page geometry, straight from the content stream. Each entry is the cm
# matrix: width, height, x, y in points, with the PDF origin bottom-left.
my $S = 4 / 3;
my $PH = 792;
my @place = (
  [$p0, 110.25, 567,  90,     183   ],
  [$p1, 321.75, 78,   200.25, 672   ],
  [$p2, 321.75, 25.5, 200.25, 589.39],
  [$p4, 321.75, 351,  200.25, 201.19],
);

my $svg = sprintf
  qq{<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" viewBox="0 0 %d %d" role="img" aria-label="PEI membership certificate 2026 for PT. Hanindo Citra">\n},
  612 * $S, $PH * $S, 612 * $S, $PH * $S;
$svg .= qq{<rect width="100%" height="100%" fill="#fff"/>\n};
for my $p (@place) {
  my ($data, $w, $h, $x, $y) = @$p;
  $svg .= sprintf qq{<image x="%.2f" y="%.2f" width="%.2f" height="%.2f" href="%s"/>\n},
    $x * $S, ($PH - $y - $h) * $S, $w * $S, $h * $S, uri($data);
}
# The two live text runs, at the Tm positions and sizes the PDF uses.
# F1 is Helvetica-BoldOblique and F2 is Times-BoldItalic, so each gets the
# nearest web-safe stack rather than one shared serif.
$svg .= sprintf
  qq{<text x="%.2f" y="%.2f" font-family="Helvetica,Arial,sans-serif" font-weight="bold" font-style="oblique" font-size="%.1f" fill="#d0202f">2026</text>\n},
  307.76 * $S, ($PH - 625.84) * $S, 48 * $S;
$svg .= sprintf
  qq{<text x="%.2f" y="%.2f" font-family="'Times New Roman',Times,serif" font-weight="bold" font-style="italic" font-size="%.1f" fill="#000">PT. Hanindo Citra</text>\n},
  295.09 * $S, ($PH - 573.97) * $S, 16.5 * $S;
$svg .= "</svg>\n";

open my $o, '>:raw', $OUT or die $!;
print $o $svg;
close $o;
printf "wrote %s  (%d bytes)\n", $OUT, length $svg;
