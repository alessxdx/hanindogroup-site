#!/usr/bin/env perl
# =====================================================================
# Hanindo Group — photo wanted-list checker
# ---------------------------------------------------------------------
# Compares PHOTOS-NEEDED.txt against what the pages actually ask for and
# what is actually on disk, and reports where the three have drifted
# apart.
#
# RUN IT:   perl tools/check-photos.pl
# from anywhere — it locates the site root from its own path.
# Exits 0 when everything agrees, 1 when something needs attention, so
# it can gate a commit if anyone ever wants that.
#
# WHEN TO RUN IT: after adding or removing a photo slot, and before
# handing the list to whoever is sourcing photographs. The list is only
# useful if it is true; each of the four checks below exists because
# that exact mistake had already happened at least once:
#
#   UNTRACKED   a page loads a photo the list never mentions, so nobody
#               knows it exists. The Gilbarco dispenser shots sat like
#               this, and the whole dispenser page had no section.
#   MISSING     the list says COMPLETE/DONE but no such file exists —
#               usually a typo or a rename that only went one way.
#   CHECK STATUS the list says NEEDED but the file is sitting there.
#               logo-automation.png read as outstanding for weeks.
#   EXTENSION   the list names foo.jpg, the page loads foo.png. The
#               worst kind: someone supplies the .jpg, it is filed
#               correctly, and it still never appears.
#   UNWIRED     an entry no page references. The list opens by promising
#               every slot is wired and that a correctly named file
#               appears automatically; seven automation slots and the
#               Partners hero quietly broke that promise. Head the block
#               "NOT WIRED" to acknowledge it and the check stays quiet.
#
# --summary adds a section-by-section count and lists what is actually
# outstanding, using the same parse as the checks above rather than a
# second reader of its own.
#
# Perl for the same reason as the other tools here — Git for Windows
# ships it, and this repo is edited on a machine that may have nothing
# else.
# =====================================================================
use strict;
use warnings;
use File::Find;
use File::Basename;
use File::Spec;

my $ROOT = dirname(dirname(File::Spec->rel2abs(__FILE__)));
chdir $ROOT or die "cannot enter site root $ROOT: $!";

my $LIST = 'PHOTOS-NEEDED.txt';
open(my $lfh, '<:raw:encoding(UTF-8)', $LIST) or die "cannot read $LIST: $!";
my $wanted = do { local $/; <$lfh> };
close $lfh;

# ---------------------------------------------------------------------
# Folders the list deliberately does NOT track file by file. Flagging
# these would bury the real findings under a hundred logos.
#
#   partners/ customers/ certificates/  tracked by count in their own
#                                       sections, not by filename
#   automotive/projects/                the projects section says in so
#                                       many words that these have no
#                                       fixed names — the page grows an
#                                       entry per project
#   fire-fighting/photos/               the list states this folder is
#                                       outside the layout it describes
# ---------------------------------------------------------------------
my @UNTRACKED_OK = (
  qr{^photos/partners/},
  qr{^photos/customers/},
  qr{^photos/shared/certificates/},
  qr{^photos/automotive/projects/},
  qr{^fire-fighting/photos/},
);
sub tracked_by_section { my $p = shift; return scalar grep { $p =~ $_ } @UNTRACKED_OK }

# ---------------------------------------------------------------------
# Every image every page asks for, as a path from the site root.
# ---------------------------------------------------------------------
my %ref;                       # site-root path -> { page => 1 }
my @pages;
find({ no_chdir => 1, wanted => sub {
  return unless /\.html$/;
  my $p = $File::Find::name; $p =~ s{^\./}{}; $p =~ s{\\}{/}g;
  push @pages, $p;
}}, '.');

for my $page (sort @pages) {
  open(my $fh, '<:raw:encoding(UTF-8)', $page) or next;
  local $/; my $doc = <$fh>; close $fh;
  my $dir = $page; $dir =~ s{[^/]+$}{};
  # The (?:\?[^"]*)? matters: 77 of this site's 640 image references carry
  # a cache-buster — hero-automation.jpg?v=1 and friends. Requiring the
  # extension to sit immediately before the closing quote skipped every
  # one of them, which hid a whole company's photography from the checks
  # below and had the list reporting a hero that has been in place for
  # weeks as still outstanding.
  # href as well as src. Not every photograph is shown in an <img>: the
  # SKK licence is deliberately a text link on the Fire Fighting About
  # page rather than a card, and reading only src reported a certificate
  # that has been linked all along as wired up to nothing.
  while ($doc =~ m{(?:src|href)="([^"]+\.(?:jpe?g|png|webp|svg|gif)(?:\?[^"]*)?)"}gi) {
    my $src = $1;
    next if $src =~ m{^(https?:)?//};
    $src =~ s/\?.*$//;
    my $path;
    if ($src =~ m{^/}) { ($path = $src) =~ s{^/}{} }         # absolute (404.html)
    else {
      my @seg = grep { length } split m{/}, $dir;            # relative to the page
      my $rel = $src;
      while ($rel =~ s{^\.\./}{}) { pop @seg }
      $rel =~ s{^\./}{};
      $path = join('/', @seg, $rel); $path =~ s{^/}{};
    }
    $ref{$path}{$page} = 1;
  }
}

# ---------------------------------------------------------------------
# Everything the list names, with the status it claims.
# ---------------------------------------------------------------------
my %listed;                    # basename -> status
#
# An entry is its own line PLUS the indented continuation lines under
# it, because the status marker is very often on the second line:
#
#   gilbarco-lineup.webp    Product card AND home tile — Gilbarco
#                           range (1037x598).              [DONE]
#
# Reading only the first line marks half the finished entries as still
# wanted, which is worse than not checking at all — a report full of
# false alarms is a report nobody reads.
#
# The status also has to be read under the slide/section heading it sits
# beneath: the home page hero lists its three slides as
# "SLIDE 2 — ... [NEEDED]" with the filename on the line below.
my @lines = split /\r?\n/, $wanted;
my %section_of;                # basename -> the section it is filed under
my %unwired_ack;               # basename -> deliberately not wired to a page
my $current_section = '(preamble)';
my $in_unwired_block = 0;
for my $i (0 .. $#lines) {
  # A section heading is a left-margin line in caps, optionally with the
  # page it covers in brackets, and is followed or preceded by a rule.
  # Bind the capture on its own line, before anything else runs a regex.
  # Testing "is this also a filename?" in the same condition resets $1,
  # which silently filed every entry under "(unfiled)".
  if (my ($cand) = $lines[$i] =~ /^([A-Z][A-Z0-9][A-Za-z0-9 &,'\/\.\(\)\-]{3,})\s*$/) {
    my $is_file = $cand =~ /^[A-Za-z0-9][A-Za-z0-9._-]*\.(?:jpe?g|png|webp|svg)\b/;
    my $ruled   = ($i > 0        && $lines[$i-1] =~ /^-{10,}/)
               || ($i < $#lines  && $lines[$i+1] =~ /^-{10,}/);
    my $known   = $cand =~ /^(CUSTOMER LOGOS|NOTES ON SOURCES|COMPANY LOGOS|FOLDER LAYOUT|SLIDE )/;
    $cand =~ s/\s+$//;
    $current_section = $cand if !$is_file && ($ruled || $known);
    $in_unwired_block = 0 if !$is_file && ($ruled || $known);
  }
  # "NOT WIRED" above a block marks those slots as a known, deliberate
  # state rather than a fault: they describe a layout the page does not
  # currently run. Without a way to say so the report can never go quiet,
  # and a report that always complains is one nobody reads.
  $in_unwired_block = 1 if $lines[$i] =~ /^NOT WIRED\b/i;
  # A line can START with a filename and still be prose about it:
  #
  #   orpak.jpg and invenco.jpg were shipped with wide blank margins
  #   gilbarco-lineup.webp sits in this folder too but belongs to ...
  #
  # Counting those as entries put two deleted source files on the
  # outstanding list. Column position cannot separate them — the longest
  # filenames eat their own column — but the wording can: a description
  # starts with a capital or a model number, prose carries on in
  # lowercase or with a dash.
  next unless my ($file, $after) =
    $lines[$i] =~ /^([A-Za-z0-9][A-Za-z0-9._-]*\.(?:jpe?g|png|webp|svg))\b(.*)/;
  # Also prose: a filename mid-sentence in a wrapped line, where the
  # next character is punctuation rather than the gap before a
  # description — "piusi.svg, transtank.webp, tt.webp) have been deleted".
  next unless $after =~ /^(?:\s|$)/;
  # \x{2014}/\x{2013} rather than literal dashes: this file is read through
  # :encoding(UTF-8) so $after holds characters, while a literal em-dash
  # typed into this source is raw bytes without `use utf8`. They never
  # compare equal, so the prose line this was meant to skip was reported
  # as a missing photograph.
  next if $after =~ /^\s+[a-z]/ || $after =~ /^\s*[\x{2014}\x{2013}-]\s/;
  $section_of{$file} = $current_section unless exists $section_of{$file};
  $unwired_ack{$file} = 1 if $in_unwired_block;
  # NOT first-mention-wins: several files are named once in a prose
  # paragraph with no marker and again in their real entry with one.
  # Taking the first reading marked airtec-lineup.png as outstanding
  # when its own line says [COMPLETE]. The most definite reading wins.
  next if ($listed{$file} || '') ne '' && ($listed{$file} eq 'HAVE' || $listed{$file} eq 'DROPPED');
  my $block = $lines[$i];
  for (my $j = $i + 1; $j <= $#lines; $j++) {
    last unless $lines[$j] =~ /^\s+\S/;            # indented = still this entry
    $block .= "\n" . $lines[$j];
  }
  # the nearest left-margin heading above, for slide-style statuses
  my $head = '';
  for (my $k = $i - 1; $k >= 0 && $k > $i - 8; $k--) {
    next if $lines[$k] =~ /^\s*$/;
    last if $lines[$k] =~ /^[A-Za-z0-9][A-Za-z0-9._-]*\.(?:jpe?g|png|webp|svg)\b/;
    if ($lines[$k] !~ /^\s/) { $head = $lines[$k]; last }
  }
  my $status = 'WANTED';
  $status = 'HAVE' if $block =~ /\[(?:DONE|COMPLETE)\]/
                   || $block =~ /\bDONE\b/
                   || $block =~ /\bIn place\b/i
                   || $block =~ /\bIN USE\b/i
                   || $head  =~ /\[(?:DONE|COMPLETE)\]/;
  # A stand-in is on disk on purpose: the slot is filled well enough to
  # ship but the real photograph is still wanted. Reporting these as
  # "already arrived" would be wrong, and worse, would train whoever
  # reads this to ignore the section.
  $status = 'PLACEHOLDER' if $block =~ /\[PLACEHOLDER\]/i
                          || $block =~ /\bplaceholder\b/i
                          || $block =~ /\bstand-in\b/i;
  $status = 'DROPPED' if $block =~ /NO LONGER NEEDED/ || $block =~ /NOT NEEDED/;
  # An acknowledged unwired slot is not something anyone can act on —
  # nobody can supply a photograph into a slot no page reads — so it
  # should not sit in the outstanding column padding the count.
  $status = 'UNWIRED' if $unwired_ack{$file} && $status eq 'WANTED';
  $listed{$file} = $status;
}

# ---------------------------------------------------------------------
# The four checks.
# ---------------------------------------------------------------------
my (@untracked, @missing, @stale, @extension, @unwired);

for my $path (sort keys %ref) {
  my $base = basename($path);
  next if $listed{$base};
  next if tracked_by_section($path);

  # Same stem, different extension, is the trap worth naming outright.
  my ($stem) = $base =~ /^(.*)\.[^.]+$/;
  my ($other) = grep { /^\Q$stem\E\.[^.]+$/ } keys %listed;
  if ($other) { push @extension, "$base  (page loads this; list says $other)"; next }

  my $n = scalar keys %{ $ref{$path} };
  push @untracked, sprintf('%-46s used on %d page%s', $path, $n, $n > 1 ? 's' : '');
}

for my $file (sort keys %listed) {
  next if $listed{$file} eq 'DROPPED' || $listed{$file} eq 'PLACEHOLDER';
  my $found = 0;
  for my $p (keys %ref) { $found = 1, last if basename($p) eq $file }
  unless ($found) {
    # not referenced by any page; is it at least on disk somewhere?
    my @hits;
    find({ no_chdir => 1, wanted => sub { push @hits, $File::Find::name if basename($_) eq $file } }, '.');
    if ($listed{$file} eq 'HAVE' && !@hits) { push @missing, $file }
    # No page asks for this file. The list opens by promising every slot
    # is wired and that a correctly named file appears automatically, so
    # an entry nothing references is a broken promise: the photograph
    # gets sourced, filed perfectly, and nothing happens.
    # photos/not-used/ is documented as exactly this, and the logo
    # inventories are counted rather than wired, so neither is a finding.
    my $parked    = grep { m{photos/not-used/} } @hits;
    my $inventory = grep { m{photos/(?:partners|customers)/} } @hits;
    push @unwired, sprintf('%-30s %s', $file,
      @hits ? 'on disk, but no page loads it' : 'no page loads it')
      unless ($listed{$file} eq 'HAVE' && !@hits)
          || $parked || $inventory || $unwired_ack{$file};
    next;
  }
  my ($disk) = grep { basename($_) eq $file && -e $_ } keys %ref;
  if ($listed{$file} eq 'HAVE' && !$disk)  { push @missing, $file }
  if ($listed{$file} eq 'WANTED' && $disk) { push @stale,   "$file  (on disk at $disk)" }
}

# ---------------------------------------------------------------------
# Report.
# ---------------------------------------------------------------------
my $problems = 0;
sub section {
  my ($title, $why, @rows) = @_;
  return unless @rows;
  $problems += @rows;
  print "\n$title (", scalar(@rows), ")\n  $why\n";
  print "    $_\n" for @rows;
}

section('EXTENSION MISMATCH', 'the list names one extension, the page loads another', @extension);
section('UNTRACKED',  'a page loads these, the list never mentions them', @untracked);
section('MISSING',    'the list says the file is in, but it is not on disk', @missing);
section('UNWIRED',    'listed as a slot, but no page loads it — supplying the file would'
                    . "\n  change nothing, so wire it up, drop it, or head the block \"NOT WIRED\"", @unwired);
section('CHECK STATUS', 'listed as still wanted, but a file is already there — either the'
                      . "\n  photo has arrived and the marker was never updated, or what is on\n"
                      . '  disk is a stand-in, in which case mark it [PLACEHOLDER]', @stale);

printf "\n%s\n", $problems
  ? "$problems item(s) need attention — see above."
  : "PHOTOS-NEEDED.txt agrees with the pages and the disk.";
printf "checked %d pages, %d referenced images, %d entries in the list\n",
  scalar(@pages), scalar(keys %ref), scalar(keys %listed);

# ---------------------------------------------------------------------
# --summary: what is still outstanding, section by section.
#
# Deliberately built on the same %listed the checks above use. An
# earlier throwaway version of this report had its own cut-down parser
# and misfiled entries into the wrong sections while counting prose
# cross-references as outstanding requests — the exact class of mistake
# this tool exists to catch.
# ---------------------------------------------------------------------
if (grep { $_ eq '--summary' } @ARGV) {
  my (%tally, @order, %seen, %open_items);
  for my $file (sort keys %listed) {
    my $sec = $section_of{$file} || '(unfiled)';
    push @order, $sec unless $seen{$sec}++;
    my $s = $listed{$file};
    $tally{$sec}{$s}++;
    push @{ $open_items{$sec} }, $file if $s eq 'WANTED';
  }
  printf "\n%-42s %5s %6s %5s %7s %5s\n",
    'SECTION', 'have', 'stand', 'want', 'unwired', 'drop';
  print '-' x 75, "\n";
  my %tot;
  for my $sec (@order) {
    my $t = $tally{$sec};
    $tot{$_} += ($t->{$_} || 0) for qw(HAVE PLACEHOLDER WANTED UNWIRED DROPPED);
    printf "%-42s %5d %6d %5d %7d %5d\n", substr($sec,0,42),
      $t->{HAVE}||0, $t->{PLACEHOLDER}||0, $t->{WANTED}||0, $t->{UNWIRED}||0, $t->{DROPPED}||0;
  }
  print '-' x 75, "\n";
  printf "%-42s %5d %6d %5d %7d %5d\n", 'TOTAL',
    $tot{HAVE}||0, $tot{PLACEHOLDER}||0, $tot{WANTED}||0, $tot{UNWIRED}||0, $tot{DROPPED}||0;

  unless ($tot{WANTED}) {
    print "\nNothing outstanding: every wired slot has a file.\n";
    print "The ", ($tot{UNWIRED}||0), " unwired entries describe layouts no page runs — see\n",
          "the NOT WIRED blocks in the list. Wire the slot before asking for the photo.\n"
      if $tot{UNWIRED};
    print "The ", ($tot{PLACEHOLDER}||0), " stand-ins ship fine but are not the real photograph.\n"
      if $tot{PLACEHOLDER};
    print "\n";
    exit($problems ? 1 : 0);
  }

  print "\nSTILL WANTED, by section:\n";
  for my $sec (@order) {
    next unless $open_items{$sec} && @{ $open_items{$sec} };
    print "\n  $sec\n";
    print "     $_\n" for @{ $open_items{$sec} };
  }
  print "\n";
}

exit($problems ? 1 : 0);
