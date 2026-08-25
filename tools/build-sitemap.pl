#!/usr/bin/env perl
# =====================================================================
# Hanindo Group — sitemap builder
# ---------------------------------------------------------------------
# Reads every page in the site and writes sitemap.xml, the file Google
# Search Console is pointed at and the one robots.txt advertises.
#
# RUN IT:   perl tools/build-sitemap.pl
# from anywhere — it locates the site root from its own path.
#
# WHEN TO RUN IT: any time a page is added, deleted or renamed. Nothing
# regenerates this automatically. A sitemap is a promise that these URLs
# exist, so a stale one is worse than none at all: it sends crawlers to
# pages that 404 and leaves new pages undiscovered. Editing the wording
# on an existing page does not require a rebuild, though it will refresh
# that page's <lastmod>.
#
# Perl, not Node, for the same reason as build-search-index.pl — Git for
# Windows ships perl, and this repo is edited on a machine that may have
# nothing else.
#
# NOTE: the canonical host below must match the rel=canonical and og:url
# tags in the pages themselves. They were all written for the bare
# domain; www 301s to it. If hosting ever flips to www, this constant
# and every one of those tags have to change together.
# =====================================================================
use strict;
use warnings;
use File::Find;
use File::Basename;
use File::Spec;

my $BASE = 'https://hanindogroup.com';

# ---------------------------------------------------------------------
# Site root: this script lives in tools/, so the root is one level up.
# ---------------------------------------------------------------------
my $ROOT = dirname(dirname(File::Spec->rel2abs(__FILE__)));
chdir $ROOT or die "cannot enter site root $ROOT: $!";

my $OUT = 'sitemap.xml';

# ---------------------------------------------------------------------
# Pages deliberately kept OUT of the sitemap. This list mirrors the one
# in build-search-index.pl, plus the error page.
#
#   search/index.html     the results page itself — nothing to index,
#                         and robots.txt disallows /search/ anyway
#   404.html              an error page is not a destination
#   fire-fighting/hanindo-citra-website.html
#                         the optional whole-department-in-one-page
#                         variant (see fire-fighting/README-FOR-
#                         COLLEAGUE.txt). Its text duplicates the five
#                         real fire-fighting pages, and nothing on the
#                         site links to it, so listing it would invite
#                         Google to treat it as a competing copy.
# ---------------------------------------------------------------------
my %SKIP = (
  'search/index.html'                        => 1,
  '404.html'                                 => 1,
  'fire-fighting/hanindo-citra-website.html' => 1,
  # Citra product detail pages are now redirect stubs to the manufacturers'
  # own sites; keep them out of the sitemap.
  'citra/dispensers.html'                    => 1,
  'citra/forecourt-controllers.html'         => 1,
  'citra/flow-meters.html'                   => 1,
  'citra/tank-gauging.html'                  => 1,
  'citra/submersible-pumps.html'             => 1,
);

# ---------------------------------------------------------------------
# URL for a page, in the form the rest of the site links to. Directory
# index pages become the directory itself ("citra/", not
# "citra/index.html"); the home page becomes the bare domain.
# ---------------------------------------------------------------------
sub page_url {
  my $path = shift;
  $path =~ s/(^|\/)index\.html$/$1/;
  return "$BASE/$path";
}

# ---------------------------------------------------------------------
# Last modified date, as YYYY-MM-DD.
#
# Git's commit date, not the file's mtime: on a fresh clone every mtime
# is the checkout time, which would tell Google the whole site changed
# at once. A page that is staged but not yet committed has no commit
# date, so it falls back to mtime.
# ---------------------------------------------------------------------
sub last_modified {
  my $path = shift;
  # devnull rather than a literal NUL or /dev/null: this runs under cmd
  # on the Windows machine and under sh everywhere else.
  my $null = File::Spec->devnull;
  my $date = `git log -1 --format=%cs -- "$path" 2>$null`;
  $date = '' unless defined $date;
  $date =~ s/\s+//g;
  return $date if $date =~ /^\d{4}-\d{2}-\d{2}$/;

  my @t = localtime((stat $path)[9] || time);
  return sprintf '%04d-%02d-%02d', $t[5] + 1900, $t[4] + 1, $t[3];
}

# ---------------------------------------------------------------------
# Priority is a hint, not a ranking. The home page leads, the company
# home pages sit above their own sub-pages, everything else is level.
# ---------------------------------------------------------------------
sub priority {
  my $path = shift;
  return '1.0' if $path eq 'index.html';
  return '0.8' if $path =~ m{^[^/]+/index\.html$};
  return '0.6';
}

# ---------------------------------------------------------------------
# Collect the pages. Sorted so the file only changes when the site does,
# with the home page pulled to the front because a sitemap that opens on
# the home page is easier for a human to eyeball.
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

@pages = sort {
  ($a eq 'index.html' ? 0 : 1) <=> ($b eq 'index.html' ? 0 : 1) or $a cmp $b
} @pages;

# ---------------------------------------------------------------------
# Write it.
# ---------------------------------------------------------------------
open my $out, '>:encoding(UTF-8)', $OUT or die "cannot write $OUT: $!";
print $out qq{<?xml version="1.0" encoding="UTF-8"?>\n};
print $out qq{<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n};
for my $path (@pages) {
  print $out "  <url>\n";
  print $out '    <loc>', page_url($path), "</loc>\n";
  print $out '    <lastmod>', last_modified($path), "</lastmod>\n";
  print $out '    <priority>', priority($path), "</priority>\n";
  print $out "  </url>\n";
}
print $out "</urlset>\n";
close $out;

printf STDERR "sitemap: %d pages -> %s\n", scalar(@pages), $OUT;
