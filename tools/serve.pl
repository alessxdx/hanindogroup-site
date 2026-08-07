#!/usr/bin/env perl
# =====================================================================
# Hanindo Group — local preview server
# ---------------------------------------------------------------------
# Serves the site on http://127.0.0.1:5173 so it can be opened in a
# browser the way it will actually be published.
#
#   perl tools/serve.pl          (or set PORT to use another port)
#
# Opening the pages straight off disk with file:// mostly works, but the
# search page does not: it fetches assets/search-index.json, and browsers
# refuse that request from a file:// page. Anything that touches search
# has to be checked through here.
#
# Perl for the same reason as the index builder — this machine has no
# Node and no Python, and Git for Windows ships perl.
# =====================================================================
use strict;
use warnings;
use HTTP::Daemon;
use HTTP::Status;
use HTTP::Response;
use File::Basename;
use File::Spec;

my $ROOT = dirname(dirname(File::Spec->rel2abs(__FILE__)));
chdir $ROOT or die "cannot enter site root $ROOT: $!";

my $PORT = $ENV{PORT} || 5173;

my %TYPE = (
  html => 'text/html; charset=utf-8',
  css  => 'text/css; charset=utf-8',
  js   => 'application/javascript; charset=utf-8',
  json => 'application/json; charset=utf-8',
  txt  => 'text/plain; charset=utf-8',
  svg  => 'image/svg+xml',
  jpg  => 'image/jpeg',  jpeg => 'image/jpeg',
  png  => 'image/png',   gif  => 'image/gif',
  webp => 'image/webp',  ico  => 'image/x-icon',
  woff => 'font/woff',   woff2 => 'font/woff2',
  pdf  => 'application/pdf',
);

my $d = HTTP::Daemon->new(
  LocalAddr => '127.0.0.1',
  LocalPort => $PORT,
  ReuseAddr => 1,
) or die "cannot listen on port $PORT: $!\n";

print "serving $ROOT at http://127.0.0.1:$PORT/\n";
STDOUT->autoflush(1);

while (my $c = $d->accept) {
  while (my $req = $c->get_request) {
    if ($req->method ne 'GET' && $req->method ne 'HEAD') {
      $c->send_error(RC_METHOD_NOT_ALLOWED);
      next;
    }

    my $path = $req->uri->path;
    $path =~ s/^\///;
    $path = 'index.html' if $path eq '';
    $path .= 'index.html' if $path =~ /\/$/;

    # Refuse anything trying to climb out of the site directory.
    if ($path =~ /(^|\/)\.\.(\/|$)/) {
      $c->send_error(RC_FORBIDDEN);
      print "403 /$path\n";
      next;
    }

    # A bare directory with no trailing slash, e.g. /search
    $path .= '/index.html' if -d $path;

    if (!-f $path) {
      $c->send_error(RC_NOT_FOUND);
      print "404 /$path\n";
      next;
    }

    my ($ext) = $path =~ /\.([a-zA-Z0-9]+)$/;
    my $type = $TYPE{lc($ext || '')} || 'application/octet-stream';

    open my $fh, '<:raw', $path or do {
      $c->send_error(RC_INTERNAL_SERVER_ERROR);
      next;
    };
    local $/;
    my $body = <$fh>;
    close $fh;

    my $res = HTTP::Response->new(RC_OK);
    $res->header('Content-Type' => $type);
    # No caching, so a rebuilt search index shows up on reload rather
    # than after a puzzled ten minutes.
    $res->header('Cache-Control' => 'no-store');
    $res->content($req->method eq 'HEAD' ? '' : $body);
    $c->send_response($res);
    print "200 /$path\n";
  }
  $c->close;
  undef $c;
}
