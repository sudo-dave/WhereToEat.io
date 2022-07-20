from flask import Flask
from api import api
import os
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
app.register_blueprint(api, url_prefix="/api")

DB_FILENAME = "Userdata.db"


@app.route('/')
def index():
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


def init_db():
    if os.path.isfile(DB_FILENAME):
        return
    engine = create_engine('sqlite:///' + DB_FILENAME, echo=True)
    meta = MetaData()
    main = Table(
        'main', meta,
        Column('id', Integer, primary_key=True),
        Column('url', String),
        Column('max_size', Integer),
        Column('current_size', String),
        Column('data', String)
    )
    meta.create_all(engine)


if __name__ == '__main__':
    init_db()
    app.run(debug=True)
