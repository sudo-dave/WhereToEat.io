from concurrent.futures import thread
from flask import Flask
from api import api
import os
from room import Room
from base import session_factory, DB_FILENAME


app = Flask(__name__, static_url_path='', static_folder='frontend/build')
app.register_blueprint(api, url_prefix="/api")


@app.route('/')
def index():
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


def init_db():
    if os.path.isfile(DB_FILENAME):
        return
    session = session_factory()
    start_data = Room("cbatest", 23, 12, "test-data", 0)
    extra_data = Room("abctest", 323, 0, "2nd-test", 0)
    session.add(start_data)
    session.add(extra_data)
    session.commit()
    session.close()


if __name__ == '__main__':
    init_db()
    app.run(threaded=True)
