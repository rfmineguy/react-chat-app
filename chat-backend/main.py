from fastapi import FastAPI
import socketio
import json
from connection_mgr import ConnectionManager


sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
app = FastAPI()
app.mount("/", socketio.ASGIApp(sio))

manager = ConnectionManager(sio)


@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")
    await manager.connect(sid)


@sio.event
async def joinroom(sid, data):
    print(f"sid {sid} joining room {data}")
    await manager.move_to_room(sid, data['room-name'])
    manager.show_rooms()


@sio.event
async def createroom(sid, data):
    if len(data) == 0:
        print("Room empty. Not created")
    else:
        print(f"sid {sid} create room {data}")
        await manager.create_room(sid, data['room-name'])
        await manager.broadcast_rooms()


@sio.event
async def addchatline(sid, chatline):
    await manager.addchatline(sid, chatline)


@sio.event
async def disconnect(sid):
    print(manager.connections)
    print(f"Client disconnected: {sid}")
    await manager.disconnect(sid)


@app.get("/")
def read_root():
    return {}
