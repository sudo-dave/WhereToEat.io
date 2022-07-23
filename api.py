from flask import request, Blueprint
import random
import uuid

from room import Room
from base import session_factory, DB_FILENAME
from sqlalchemy import update
rooms = dict()

api = Blueprint("api", __name__)

DATA_ENCODE_SYMBOL = "@"


@api.route("/room", methods=['GET'])
def joinRoom():
    roomId = request.args.get('id')
    if len(roomId) != 7:
        return 'Invalid room Id', 400

    session = session_factory()
    res = session.query(Room.current_size).where(Room.url == roomId)
    session.close()

    # return a row object not tuples -
    # convert to dict
    row = [dict(r) for r in res]

    if not row:
        return "room ID not valid", 404

    if row[0]['current_size'] == 0:
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

    session = session_factory()
    room = Room(roomId, roomSize, 0, '')
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
    roomId = str(content['roomID'])

    if len(roomId) != 7:
        return 'Invalid room Id', 400

    if not len(restaurants) or len(restaurants) > 4:
        return 'not correct number of resturants', 400
    session = session_factory()

    res = session.query(Room.current_size, Room.data).where(Room.url == roomId)

    # return a row object not tuples -
    # convert to dict
    row = [dict(r) for r in res]
    if not row:
        return "room ID not valid", 404

    if int(row[0]['current_size']) == 0:
        return 'Room is full', 401

    session.query(Room).where(Room.url == roomId).update(
        {"current_size": Room.current_size - 1, Room.data:  DATA_ENCODE_SYMBOL.join(restaurants)})

    session.commit()
    session.close()

    return "SUCCESS", 200
