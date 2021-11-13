from flask import Flask , request
import random
import uuid

rooms = dict()

app = Flask(__name__)


@app.route("/api", methods = ['GET'])
def test():
    return 'LOOKs good', 200

@app.route("/fastfood-names", methods = ['GET'])
def hello_world():
    return {'foodNames': ['McDonalds' , 'Wendys', 'Carls']}

@app.route("/room", methods = ['GET'])
def joinRoom():
    roomId = request.args.get('id')
    if not roomId:
        return 'No input', 400
    if roomId not in rooms:
        return 'Room not found', 404
    if rooms.get(roomId) == 0:
        return 'Room is full', 401
    
    # userSetSize = rooms.get(roomId)
    #depnding on the uuid may want to type chekc it
    # rooms[roomId] = userSetSize - 1
    print(rooms)
    
    return 'looks good', 200

@app.route("/generate-url", methods = ['POST'])
def generate():
    #Check route
    try:
        roomSize = int(request.form['size'])
    except ValueError:
        return 'bad input', 400
    
    if roomSize > 4 or roomSize <  1:
        return 'size out of range', 400
    

    roomId = str(uuid.uuid4())[:7]
    while roomId in rooms:
        roomId = str(uuid.uuid4())[:7]
    
    print(roomId)
    # add the dict`
    rooms[roomId] = {'roomSize': roomSize, 'currentRoomSize' : roomSize, 'restaurants': []}
    # print(rooms)
    # print(roomId)
    return roomId, 200


@app.route("/getResults", methods = ['POST'])
def getResutls():
    if not request.is_json:
        return 'bad Input ', 400

    content = request.get_json()

    roomId = content['roomID']
    #do more data cleaning
    #need somethingto cflean up the code
    print(rooms)
    if roomId in rooms.keys():
        # cOuld be vunerapbe to tamepring if keep on inputing the url
        #Need to fucn to celan up the data in
        if rooms[roomId]['currentRoomSize'] ==  0: 
            randomRes = random.choice(rooms[roomId]['restaurants'])
            rooms[roomId]['result'] = randomRes
            rooms[roomId]['currentRoomSize'] -= 1
            return randomRes, 200
        elif rooms[roomId]['currentRoomSize'] <  0:
            return rooms[roomId]['result'], 200
        else:
            return 'No full yet', 400
       
        

    return 'bad INput or not in Room' , 400



@app.route("/setResults", methods = ['POST'])
def setResults():
    #make sure json is coorect format
    # make sure to validate the json
    if not request.is_json:
        return 'Not JSON', 400

    content = request.get_json()
    restaurants = content['restaurants']
    roomId = content['roomID']
    
    print(roomId)


    if not len(restaurants) == 4:
        return 'not correct number of resturants', 400
    
    ##if number is longer than y
    
    if roomId in rooms.keys():
        if rooms[roomId]["currentRoomSize"] <= 0:
            return "cant send anymore", 400
        rooms[roomId]['restaurants'].extend(restaurants)
        rooms[roomId]["currentRoomSize"] -= 1
    else:
        return 'bad room id', 400
    

    print(rooms)
    # reply = request.json()
    print("reply") 
    return "LOOks good", 200
    
    






    

