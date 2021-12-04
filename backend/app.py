from flask import Flask , request
import random
import uuid

rooms = dict()

app = Flask(__name__, static_url_path='', static_folder='../frontend/build')

@app.route('/')
def index():
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route("/testAPI", methods = ['GET'])
def test():
    return 'Hello World', 200

@app.route("/fastfood-names", methods = ['GET'])
def hello_world():
    return {'foodNames': ['McDonalds' , 'Wendys', 'Carls']}

@app.route("/api/room", methods = ['GET'])
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
    
    return "Vaild Room", 200

@app.route("/api/generate-url", methods = ['POST'])
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


@app.route("/api/getResults", methods = ['POST'])
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
            result = rooms[roomId]['result']

            if rooms[roomId]['currentRoomSize'] == ((int(rooms[roomId]['roomSize']) - 1) * -1):
                rooms.pop(roomId)
                return result, 200
            
            rooms[roomId]['currentRoomSize'] -= 1
            return result, 200
        else:
            return 'No full yet', 400
       
        

    return 'bad INput or not in Room' , 400



@app.route("/api/setResults", methods = ['POST'])
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
    
    






    

