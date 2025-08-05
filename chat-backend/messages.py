from dataclasses import dataclass
from room import Room
import json


@dataclass
class SendMessage():
    message: str

    def tojson(self):
        return {"message": self.message}
