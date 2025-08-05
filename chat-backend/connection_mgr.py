from room import Room
from messages import SendMessage, MoveToRoom, UpdateRoomsMessage, UpdateChatlines
import json


class ConnectionManager:
    def __init__(self, sio):
        self.sio = sio
        self.connections: list[str] = []
        self.rooms: list[Room] = []
