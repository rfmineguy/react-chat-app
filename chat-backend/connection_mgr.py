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

    async def create_room(self, sid: str, room: str):
        a = [room_ for room_ in self.rooms if room_.name == room]
        if len(a) != 0:
            print(f"Room with name '{room}' already exists")
            return

        if room not in self.rooms:
            self.rooms.append(Room(room))

    async def delete_room(self, sid: str, room: str):
        a = [room_ for room_ in self.rooms if room_.name == room]
        if len(a) != 0:
            print(f"Room with name '{room}' doesn't exist, can't delete")
            return

        if room in self.rooms:
            self.rooms.remove(room)

    async def move_to_room(self, sid, room_name):
        # Get the room we are trying to join
        rooms = [room for room in self.rooms if room.name == room_name]
        if len(rooms) == 0:
            print(f"[warn] Room ${room_name} not active")
            return

        # Remove the sid from the previously joined room if present
        prevrooms = [room for room in self.rooms if sid in room.users]
        if len(prevrooms) == 1:
            prevrooms[0].users.remove(sid)

        # Move the sid to the new room
        room = rooms[0]
        if sid not in room.users:
            room.users.append(sid)
            await self.sio.emit('join-room', {'room_name': room_name, 'sid': sid})
            await self.sio.emit('update-chat', UpdateChatlines(room.chatlines).tojson(), sid)

    async def broadcast_rooms(self):
        for conn in self.connections:
            json_rooms = [json.dumps(room.tojson()) for room in self.rooms]
            await self.sio.emit('send-rooms', UpdateRoomsMessage(json_rooms).tojson(), conn)

    async def addchatline(self, sid, chatline):
        # Get the room this client is connected to
        joined_rooms = [room for room in self.rooms if sid in room.users]

        # If no sid is not in a room ignore the request (for now)
        if len(joined_rooms) == 0:
            print(f"[warn] User ${sid} not in a room")
            return

        # Add the chatline to the joined room
        joined_room = joined_rooms[0]
        await joined_room.add_chatline(sid, chatline)

        # Send an update to the 'sid's in that room
        for sid in joined_room.users:
            await self.sio.emit('update-chat', UpdateChatlines(joined_room.chatlines).tojson(), sid)

        print(f'adding chat to room: ${joined_room}')
        pass
