from fastapi import FastAPI
import socketio
import json
from connection_mgr import ConnectionManager


sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
app = FastAPI()
app.mount("/", socketio.ASGIApp(sio))

manager = ConnectionManager(sio)
