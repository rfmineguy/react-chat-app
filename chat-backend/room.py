class Room:
    def __init__(self, name=""):
        self.users: list[str] = []
        self.name = name
        self.chatlines: list[str] = []

    async def add_user(self, sid: str):
        self.users.append(sid)

    async def remove_user(self, sid: str):
        if sid in self.users:
            self.users.remove(sid)
        else:
            print(f"{sid} not present")

    async def add_chatline(self, sid: str, chatline: str):
        # TODO: Add sanitization to the chatline string
        #       i.e. convert \ to <backslash>
        self.chatlines.append(chatline)
        print(f"add_chatline {chatline}")

    def tojson(self):
        return {"users": self.users,
                "name": self.name,
                "chatlines": self.chatlines}
