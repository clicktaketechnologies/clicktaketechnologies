"""Resilient static file preview server for clicktake-landing.html"""
import http.server
import socketserver
import os
import signal
import sys

PORT = int(os.environ.get("PORT", 8080))
DIRECTORY = "/home/z/my-project/download"


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def handle_one_request(self):
        try:
            super().handle_one_request()
        except (ConnectionResetError, BrokenPipeError):
            pass
        except Exception:
            pass

    def log_message(self, fmt, *args):
        return  # quiet


class ReusableTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


def main():
    # Graceful shutdown
    def stop(_sig, _frm):
        sys.exit(0)
    signal.signal(signal.SIGTERM, stop)
    signal.signal(signal.SIGINT, stop)

    with ReusableTCPServer(("0.0.0.0", PORT), Handler) as httpd:
        sys.stdout.write(f"preview-server listening on :{PORT}\n")
        sys.stdout.flush()
        httpd.serve_forever()


if __name__ == "__main__":
    main()
