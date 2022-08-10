import axios from "axios";
import { useEffect, useRef, useState } from "react";

const WebSocket = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");
    const [connected, setConnected] = useState(true);
    const [username, setUsername] = useState("");
    const socket = useRef();
    // test changing file
    function connect() {
        socket.current = new WebSocket("ws://localhost:3000");

        socket.current.onopen = () => {
            setConnected(true);
            const message = {
                event: "connection",
                username,
                id: Date.now(),
            };
            console.log("Socket установлен");
            socket.current.send(JSON.stringify(message));
        };
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prev) => [message, ...prev]);
            console.log("Socket закрыт");
        };
        socket.current.onclose = () => {
            console.log("Socket закрыт");
        };
        socket.current.onerror = () => {
            console.log("Socket ошибка");
        };
    }

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: "message",
        };
        socket.current.send(JSON.stringify(message));
        setValue("");
    };

    if (!connected) {
        return (
            <div>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="UserName"
                />
                <button onClick={connect}>Log In</button>
            </div>
        );
    }

    return (
        <div>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder="UserName"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default WebSocket;
