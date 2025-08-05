from room import Room
from messages import SendMessage, MoveToRoom, UpdateRoomsMessage, UpdateChatlines
import json


class ConnectionManager:
    def __init__(self, sio):
        self.sio = sio
        self.connections: list[str] = []
        self.rooms: list[Room] = []

    async def connect(self, sid: str):
        self.connections.append(sid)
        json_rooms = [json.dumps(room.tojson()) for room in self.rooms]
        await self.sio.emit('send-rooms', UpdateRoomsMessage(json_rooms).tojson(), sid)
        print(f"Sending rooms to ${sid}")

    async def disconnect(self, sid: str):
        if sid in self.connections:
            self.connections.remove(sid)
        else:
            print(f"{sid} not present")
