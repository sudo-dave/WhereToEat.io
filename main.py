from flask import Flask
from api import api


app = Flask(__name__, static_url_path='', static_folder='frontend/build')
app.register_blueprint(api,url_prefix="/api")

@app.route('/')
def index():
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)