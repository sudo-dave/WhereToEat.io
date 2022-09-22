from flask import request, Blueprint
import random
import uuid

from room import Room
from base import session_factory, DB_FILENAME

api = Blueprint("api", __name__)

DATA_ENCODE_SYMBOL = "@"


@api.route("/room", methods=['GET'])
def joinRoom():
    roomId = request.args.get('id')
    if len(roomId) != 7:
        return 'Invalid room Id', 400

    session = session_factory()
    res = session.query(Room.current_size, Room.max_size).where(
        Room.url == roomId)
    session.close()

    # return a row object not tuples -
    # convert to dict
    row = [dict(r) for r in res]

    if not row:
        return "room ID not valid", 404
    print("ROOM API")
    print(row)
    # if row[0]['current_size'] == row[0]['max_size']:
    #     return 'Room is full', 401

    return "Vaild Room", 200


@api.route("/generate-url", methods=['POST'])
def generate():

    try:
        roomSize = int(request.form['size'])
    except ValueError:
        return 'bad input', 400

    if roomSize > 4 or roomSize < 1:
        return 'size out of range', 400
    # Only return a 7 char  UUID
    roomId = str(uuid.uuid4())[:7]

    session = session_factory()
    room = Room(roomId, roomSize, 1, '', 0)
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

    if len(roomId) != 7:
        return "Invalid room Id", 400

    session = session_factory()
    res = session.query(Room.current_size, Room.data,
                        Room.max_size, Room.isDone).where(Room.url == roomId)
    session.close()

    # return a row object not tuples -
    # convert to dict
    row = [dict(r) for r in res]

    if not row:
        return "room not found", 404
    print(row)
    current_size = row[0]["current_size"]
    data = row[0]["data"]
    max_size = row[0]["max_size"]
    isDone = bool(row[0]["isDone"])

    if current_size != max_size or not isDone:
        return "All participants have not sbumite yet", 400

    updateVaules = {Room.current_size: Room.current_size - 1}
    if current_size == max_size:
        nonempty_data = [i for i in data.split(DATA_ENCODE_SYMBOL) if i]
        updateVaules[Room.data] = random.choice(nonempty_data)
        updateVaules[Room.isDone] = 1
        ans = updateVaules[Room.data]
    else:
        ans = data
    session = session_factory()
    session.query(Room).where(Room.url == roomId).update(updateVaules)
    session.commit()
    session.close()
    return ans, 200

# ----
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

    res = session.query(Room.current_size, Room.data,
                        Room.max_size).where(Room.url == roomId)
    session.close()

    # return a row object not tuples -
    # convert to dict
    row = [dict(r) for r in res]
    if not row:
        return "room ID not valid", 404

    # if row[0]['current_size'] == row[0]['max_size']:
    #     return 'Room is full', 401
    print(res)
    session = session_factory()
    newData = ''
    for place in restaurants:
        newData += DATA_ENCODE_SYMBOL + place

    session.query(Room).where(Room.url == roomId).update(
        {"current_size": Room.current_size + 1, Room.data:  Room.data + newData})

    session.commit()
    session.close()

    return "SUCCESS", 200
