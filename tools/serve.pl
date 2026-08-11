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

# Bind to loopback by default, so the preview is not reachable from the
# rest of the network unless that is asked for. LAN=1 opens it to other
# devices -- the point being to open the site on a real phone, which is
# the only way to check the things a desktop browser cannot show you:
# tap targets, the burger menu, and how the hero reflows on a small
# screen. Leave it off otherwise; this server has no access control and
# happily serves the whole repo.
my $HOST = $ENV{LAN} ? '0.0.0.0' : '127.0.0.1';

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
  LocalAddr => $HOST,
  LocalPort => $PORT,
  ReuseAddr => 1,
) or die "cannot listen on $HOST port $PORT: $!\n";

print "serving $ROOT at http://127.0.0.1:$PORT/\n";

# When it is open to the network, print the addresses a phone can
# actually use -- "0.0.0.0" is not something you can type into Safari.
if ($ENV{LAN}) {
  my @ips;
  for my $line (`ipconfig 2>&1`, `ifconfig 2>&1`) {
    push @ips, $line =~ /(\d+\.\d+\.\d+\.\d+)/g;
  }
  my %seen;
  for my $ip (@ips) {
    next if $ip =~ /^(127\.|169\.254\.|255|0\.)/ || $ip =~ /\.255$/;
    next if $seen{$ip}++;
    print "  on this network:  http://$ip:$PORT/\n";
  }
  print "  (same Wi-Fi as the phone; a VPN or the firewall can block this)\n";
}
STDOUT->autoflush(1);

# One request per connection, then close.
#
# This server is single-threaded, so it can only ever be inside one
# connection at a time. Browsers open several in parallel and hold them
# open for reuse, which deadlocks a keep-alive loop here: the server sits
# waiting for a second request that will never come on connection one,
# while the browser waits for responses on connections two through six
# and the page hangs forever. Closing each connection after its response
# costs a handshake per file and is the correct trade for a preview
# server that only ever has one visitor.
while (my $c = $d->accept) {
  # Browsers open sockets speculatively and may never send a request on
  # them. Without a timeout, accept hands us one of those and get_request
  # blocks forever, wedging the single-threaded loop against every later
  # request. Give up on a silent connection and go back to accepting.
  $c->timeout(3);

  # A bare block is a loop that runs once, so the error paths below can
  # "last REQ" out to the close at the bottom instead of skipping it.
  REQ: {
    my $req = $c->get_request or last REQ;

    if ($req->method ne 'GET' && $req->method ne 'HEAD') {
      $c->send_error(RC_METHOD_NOT_ALLOWED);
      last REQ;
    }

    my $path = $req->uri->path;
    $path =~ s/^\///;
    $path = 'index.html' if $path eq '';
    $path .= 'index.html' if $path =~ /\/$/;

    # Refuse anything trying to climb out of the site directory.
    if ($path =~ /(^|\/)\.\.(\/|$)/) {
      $c->send_error(RC_FORBIDDEN);
      print "403 /$path\n";
      last REQ;
    }

    # A bare directory with no trailing slash, e.g. /search
    $path .= '/index.html' if -d $path;

    if (!-f $path) {
      $c->send_error(RC_NOT_FOUND);
      print "404 /$path\n";
      last REQ;
    }

    my ($ext) = $path =~ /\.([a-zA-Z0-9]+)$/;
    my $type = $TYPE{lc($ext || '')} || 'application/octet-stream';

    open my $fh, '<:raw', $path or do {
      $c->send_error(RC_INTERNAL_SERVER_ERROR);
      last REQ;
    };
    local $/;
    my $body = <$fh>;
    close $fh;

    my $res = HTTP::Response->new(RC_OK);
    $res->header('Content-Type' => $type);
    # No caching, so a rebuilt search index shows up on reload rather
    # than after a puzzled ten minutes.
    $res->header('Cache-Control' => 'no-store');
    $res->header('Connection' => 'close');
    $res->content($req->method eq 'HEAD' ? '' : $body);
    $c->send_response($res);
    print "200 /$path\n";
  }
  $c->close;
  undef $c;
}
