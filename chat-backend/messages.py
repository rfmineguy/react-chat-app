from dataclasses import dataclass
from room import Room
import json


@dataclass
class SendMessage():
    message: str

    def tojson(self):
        return {"message": self.message}


@dataclass
class MoveToRoom():
    roomName: str
    sid: str

    def tojson(self):
        return {"roomName": self.roomName, "sid": self.sid}


@dataclass
class UpdateRoomsMessage():
    rooms: [Room]

    def tojson(self):
        json_rooms = [room for room in self.rooms]
        print(json_rooms)
        return {"rooms": json_rooms}
