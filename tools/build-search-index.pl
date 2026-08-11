#!/usr/bin/env perl
# =====================================================================
# Hanindo Group — search index builder
# ---------------------------------------------------------------------
# Reads every page in the site and writes assets/search-index.json, the
# file the search page (search/index.html) downloads and searches in the
# browser. There is no server and no search service: this JSON *is* the
# search engine's entire knowledge of the site.
#
# RUN IT:   perl tools/build-search-index.pl
# from anywhere — it locates the site root from its own path.
#
# WHEN TO RUN IT: any time page text changes. Nothing regenerates this
# automatically, so an edit that is not followed by a rebuild leaves the
# search results describing the old wording. Adding or deleting a page
# matters most — a deleted page keeps appearing in results, and a new one
# cannot be found at all, until this runs again.
#
# Perl, not Node, because the machine this repo is edited on has neither
# Node nor Python installed, and Git for Windows ships perl.
# =====================================================================
use strict;
use warnings;
use File::Find;
use File::Basename;
use File::Spec;

# ---------------------------------------------------------------------
# Site root: this script lives in tools/, so the root is one level up.
# ---------------------------------------------------------------------
my $ROOT = dirname(dirname(File::Spec->rel2abs(__FILE__)));
chdir $ROOT or die "cannot enter site root $ROOT: $!";

my $OUT = 'assets/search-index.json';

# ---------------------------------------------------------------------
# Pages deliberately kept OUT of the index.
#
#   search/index.html                     the results page itself
#   404.html                              the error page. Its text is
#       navigation, not content, and a search for "Hanindo" should
#       never return "we could not find that page".
#   fire-fighting/hanindo-citra-website.html
#       the optional whole-department-in-one-page variant (see
#       fire-fighting/README-FOR-COLLEAGUE.txt). Its text duplicates the
#       five real fire-fighting pages, so indexing it would return two
#       hits for every fire-fighting query, one of them a page nothing
#       on the site links to.
# ---------------------------------------------------------------------
my %SKIP = (
  'search/index.html'                       => 1,
  '404.html'                                => 1,
  'fire-fighting/hanindo-citra-website.html' => 1,
);

# ---------------------------------------------------------------------
# Named HTML entities that actually occur in these pages, plus the few
# likely to arrive with future copy. Anything not listed is decoded only
# if it is written numerically (&#8212; and friends).
# ---------------------------------------------------------------------
my %ENT = (
  amp => '&', lt => '<', gt => '>', quot => '"', apos => "'",
  nbsp => ' ', mdash => "\x{2014}", ndash => "\x{2013}",
  middot => "\x{00b7}", copy => "\x{00a9}", reg => "\x{00ae}",
  trade => "\x{2122}", hellip => "\x{2026}", bull => "\x{2022}",
  lsquo => "\x{2018}", rsquo => "\x{2019}", ldquo => "\x{201c}",
  rdquo => "\x{201d}", times => "\x{00d7}", deg => "\x{00b0}",
  plusmn => "\x{00b1}", sup2 => "\x{00b2}", sup3 => "\x{00b3}",
  frac12 => "\x{00bd}", rarr => "\x{2192}", larr => "\x{2190}",
  eacute => "\x{00e9}", egrave => "\x{00e8}", uuml => "\x{00fc}",
  euro => "\x{20ac}", pound => "\x{00a3}",
);

sub entities {
  my $s = shift;
  return '' unless defined $s;
  $s =~ s/&#x([0-9a-fA-F]+);/chr(hex($1))/ge;
  $s =~ s/&#(\d+);/chr($1)/ge;
  $s =~ s/&([a-zA-Z][a-zA-Z0-9]*);/exists $ENT{$1} ? $ENT{$1} : "&$1;"/ge;
  return $s;
}

# Collapse every run of whitespace to one space and trim the ends. The
# index stores one long line per page; line breaks in the source carry
# no meaning once the tags are gone.
sub squash {
  my $s = shift;
  return '' unless defined $s;
  $s =~ s/\s+/ /g;
  $s =~ s/^ //;
  $s =~ s/ $//;
  return $s;
}

# Minimal JSON string writer, so this script needs no modules beyond
# core. Whitespace is already squashed by the time anything reaches
# here, so control characters cannot survive to need escaping.
sub jstr {
  my $s = shift;
  $s = '' unless defined $s;
  $s =~ s/\\/\\\\/g;
  $s =~ s/"/\\"/g;
  $s =~ s/[\x00-\x1f]/ /g;
  return '"' . $s . '"';
}

# ---------------------------------------------------------------------
# URL for a page, relative to the site root, in the form the search page
# links to. Directory index pages become the directory itself, which is
# how the rest of the site links to them ("citra/", not
# "citra/index.html"). The home page becomes the empty string.
# ---------------------------------------------------------------------
sub page_url {
  my $path = shift;
  $path =~ s/(^|\/)index\.html$/$1/;
  return $path;
}

# ---------------------------------------------------------------------
# Collect the pages, in a stable order so the JSON only changes when the
# content does.
# ---------------------------------------------------------------------
my @pages;
find({
  no_chdir => 1,
  wanted   => sub {
    return unless /\.html$/;
    my $rel = $File::Find::name;
    $rel =~ s/^\.\///;
    $rel =~ s/\\/\//g;
    return if $SKIP{$rel};
    push @pages, $rel;
  },
}, '.');
@pages = sort @pages;

# ---------------------------------------------------------------------
# Turn each page into one index record.
# ---------------------------------------------------------------------
my @records;
for my $path (@pages) {
  open my $fh, '<:encoding(UTF-8)', $path or die "cannot read $path: $!";
  local $/;
  my $html = <$fh>;
  close $fh;

  # Title and meta description come out before any stripping, because
  # both live in <head> and the tag strip below would flatten them into
  # the body text.
  my ($title) = $html =~ /<title>(.*?)<\/title>/si;
  my ($desc)  = $html =~ /<meta\s+name="description"\s+content="(.*?)"/si;

  # Drop the chrome that is identical on all 50 pages. Without this the
  # footer alone would make every page a hit for "Flowtech", "Jakarta"
  # and every company name, which is the difference between search that
  # ranks and search that returns everything.
  # The header runs from the topbar to the END SITE HEADER comment. It is
  # anchored on the opening <div class="topbar"> rather than on a comment,
  # because only 17 of the 50 pages carry the matching "SITE HEADER"
  # opening comment — the company mini-sites were built without it — while
  # all 50 have the div and all 50 have the closing marker. Anchoring on
  # the comment silently left the whole nav in the text of 33 pages, which
  # made every snippet open with "Home About Us Products & Services".
  $html =~ s/<div class="topbar".*?<!--\s*END SITE HEADER\s*-->//si;
  # Belt and braces: if a future page loses the closing comment, fall back
  # to the end of the nav element so the chrome still cannot leak in.
  $html =~ s/<div class="topbar".*?<\/header>//si;
  $html =~ s/<footer class="footer".*?<\/footer>//si;

  # Navigation that sits inside the page body rather than the chrome.
  # The breadcrumb repeats the trail on every page, and .catnav repeats
  # the names of all six sibling product pages on each of them — leave
  # either in and a search for "Welding" returns the whole automotive
  # mini-site instead of the welding page. Neither loses anything: the
  # page's own name is in its <title> already.
  $html =~ s/<div class="crumb">.*?<\/div>//gsi;
  $html =~ s/<div class="catnav">.*?<\/div>//gsi;

  # The closing "contact us" block is a call to action repeated on 34
  # pages, carrying the head-office address and phone number with it.
  # On a contact page that block is the whole point, so it stays; on a
  # product page it is boilerplate, and indexing it makes every page a
  # hit for "Jakarta".
  my $is_contact_page = ($path =~ /(^|\/)contact\.html$/i)
                     || ($path =~ /(^|\/)contact\/index\.html$/i);
  $html =~ s/<section class="section contact".*?<\/section>//si
    unless $is_contact_page;

  # Then the non-content: comments, scripts, and the per-page <style>
  # blocks, which are large in this repo and full of words like "grid"
  # and "border" that must never match a search.
  $html =~ s/<!--.*?-->//gs;
  $html =~ s/<script\b.*?<\/script>//gsi;
  $html =~ s/<style\b.*?<\/style>//gsi;
  $html =~ s/<head\b.*?<\/head>//gsi;

  # Alt text is real, human-written description of a photo, so it is
  # worth keeping — pull it out before the tags go.
  my @alts;
  while ($html =~ /\balt="([^"]{3,})"/gi) { push @alts, $1; }

  $html =~ s/<[^>]*>/ /gs;

  my $text = squash(entities($html . ' ' . join(' ', @alts)));
  $title   = squash(entities($title));
  $desc    = squash(entities($desc));

  push @records, {
    u => page_url($path),
    t => $title,
    d => $desc,
    x => $text,
  };
}

# ---------------------------------------------------------------------
# Write it. One record per line: the file is generated, but it still
# lands in a diff when someone edits a page, and a line per page makes
# that diff readable.
# ---------------------------------------------------------------------
open my $out, '>:encoding(UTF-8)', $OUT or die "cannot write $OUT: $!";
print $out "[\n";
for my $i (0 .. $#records) {
  my $r = $records[$i];
  print $out '{"u":', jstr($r->{u}),
             ',"t":', jstr($r->{t}),
             ',"d":', jstr($r->{d}),
             ',"x":', jstr($r->{x}), '}';
  print $out ',' if $i < $#records;
  print $out "\n";
}
print $out "]\n";
close $out;

printf STDERR "search index: %d pages -> %s\n", scalar(@records), $OUT;
