from flask import Flask, request
import random
import uuid

rooms = dict()

app = Flask(__name__, static_url_path='', static_folder='frontend/build')


@app.route('/')
def index():
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route("/api/room", methods=['GET'])
def joinRoom():
    roomId = request.args.get('id')

    if not roomId:
        return 'No input', 400
    if roomId not in rooms:
        return 'Room not found', 404
    if rooms.get(roomId) == 0:
        return 'Room is full', 401

    return "Vaild Room", 200


@app.route("/api/generate-url", methods=['POST'])
def generate():

    try:
        roomSize = int(request.form['size'])
    except ValueError:
        return 'bad input', 400

    if roomSize > 4 or roomSize < 1:
        return 'size out of range', 400

    roomId = str(uuid.uuid4())[:7]

    while roomId in rooms:
        roomId = str(uuid.uuid4())[:7]

    rooms[roomId] = {'roomSize': roomSize,
                     'currentRoomSize': roomSize, 'restaurants': []}

    return roomId, 200


@app.route("/api/getResults", methods=['POST'])
def getResutls():
    if not request.is_json:
        return 'NOT JSON ', 400

    content = request.get_json()

    roomId = content['roomID']

    if not len(roomId) == 7:
        return "Not vaild roomID", 400

    if roomId in rooms.keys():

        if rooms[roomId]['currentRoomSize'] == 0:
            randomRes = random.choice(rooms[roomId]['restaurants'])

            rooms[roomId]['result'] = randomRes
            rooms[roomId]['currentRoomSize'] -= 1

            return randomRes, 200
        elif rooms[roomId]['currentRoomSize'] < 0:
            result = rooms[roomId]['result']

            if rooms[roomId]['currentRoomSize'] == ((int(rooms[roomId]['roomSize']) - 1) * -1):
                rooms.pop(roomId)
                return result, 200

            rooms[roomId]['currentRoomSize'] -= 1
            return result, 200
        else:
            return 'No full yet', 400

    return 'Room NOT FOUND', 400


@app.route("/api/setResults", methods=['POST'])
def setResults():

    if not request.is_json:
        return 'Not JSON', 400

    content = request.get_json()

    restaurants = content['restaurants']
    roomId = content['roomID']

    if not len(roomId) == 7:
        return "Not vaild roomID", 400

    if not len(restaurants) == 4:
        return 'not correct number of resturants', 400

    if roomId in rooms.keys():
        if rooms[roomId]["currentRoomSize"] <= 0:
            return "cant send anymore", 400

        rooms[roomId]['restaurants'].extend(restaurants)
        rooms[roomId]["currentRoomSize"] -= 1
    else:
        return 'Room not Found', 400

    return "SUCCESS", 200
