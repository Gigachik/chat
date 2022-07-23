import ws from "ws";

const { Server } = ws;

const message = {
    event: "message/connection",
    id: 123,
    date: "22.07.2022",
    userName: "Giga",
    message: "Hi, It's me",
};

const wss = new Server(
    {
        port: 3000,
    },
    () => console.log("Server started on 3000")
);

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        message = JSON.parse(message);
        switch (message.event) {
            case "message":
                broadcastMessage(message);
                break;
            case "connection":
                broadcastMessage(message);
                break;
        }
    });
});

function broadcastMessage(message) {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(message));
    });
}
