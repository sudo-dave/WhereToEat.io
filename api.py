from re import A
from flask import request, Blueprint
import random
import uuid

from room import Room
from base import session_factory, DB_FILENAME

rooms = dict()

api = Blueprint("api", __name__)


@api.route("/room", methods=['GET'])
def joinRoom():
    roomId = request.args.get('id')
    session = session_factory()
    res = session.query(Room.url, Room.current_size).all()
    # return a row object not tuples -
    # convert to dict
    session.close()
    rows = [dict(r) for r in res]
    urls = [row['url'] for row in rows]
    current_sizes = [row['current_size'] for row in rows]
    url_current_sizes = dict(zip(urls, current_sizes))

    if not roomId:
        return 'No input', 400
    if roomId not in urls:
        return 'Room not found', 404
    if url_current_sizes[roomId] == 0:
        return 'Room is full', 401

    return "Vaild Room", 200


@api.route("/generate-url", methods=['POST'])
def generate():

    try:
        roomSize = int(request.form['size'])
    except ValueError:
        return 'bad input', 400

    if roomSize > 4 or roomSize < 1:
        return 'size out of range', 400

    roomId = str(uuid.uuid4())[:7]

    # while roomId in rooms:
    #     roomId = str(uuid.uuid4())[:7]

    # rooms[roomId] = {'roomSize': roomSize,
    #                  'currentRoomSize': roomSize, 'restaurants': []}
    session = session_factory()
    room = Room(roomId, roomSize, 0, '@')
    session.add(room)
    session.commit()
    session.close()
    return roomId, 200


@api.route("/getResults", methods=['POST'])
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


@api.route("/setResults", methods=['POST'])
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
