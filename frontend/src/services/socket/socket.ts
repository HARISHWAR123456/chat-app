import { io } from "socket.io-client";
import type { GetMessages } from "../../model/common/messages";

const socket = io("http://localhost:3000", {
    autoConnect: false,
});

export function connectSocket() {

    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No authentication token found");
        return;
    }

    socket.auth = {
        token
    };

    socket.connect();
}

export function disconnectSocket() {

    if (socket.connected) {
        socket.disconnect();
    }
}


export function joinConversation(conversationId: number) {

    socket.emit("join-room", {
        conversationId,
    });
}

export function leaveConversation(conversationId: number) {

    socket.emit("leave-room", {
        conversationId,
    });
}

export function sendMessage(conversationId: number,message: string) {
    socket.emit("chat-message", {
        conversationId,
        message,
    });
}

export function onUserMessage(callback: (message: GetMessages.Message) => void) {
    socket.on("user-message", callback);
}

export function offUserMessage(callback: (message: GetMessages.Message) => void) {
    socket.off("user-message", callback);
}

export default socket;