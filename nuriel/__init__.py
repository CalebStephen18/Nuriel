from ._version import __version__
from .my_server_extension import setup_handlers

def load_jupyter_server_extension(nbapp):
    setup_handlers(nbapp.web_app)

