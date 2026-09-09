import { useState, type FormEvent } from "react";
import { sendMessage } from "../../../services/socket/socket";
import "./MessageInput.css";

type MessageInputProps = {
    conversationId: number;
};

function MessageInput({conversationId}: MessageInputProps) {

    const [message, setMessage] = useState("");

    const handleSubmit = (e: FormEvent) => {

        e.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage) {
            return;
        }

        sendMessage(conversationId,trimmedMessage);

        setMessage("");
    };

    return (
        <form className="message-input" onSubmit={handleSubmit}>

            <input
                type="text"
                value={message}
                onChange={(e) =>
                    setMessage(e.target.value)
                }
                placeholder="Type a message..."
            />

            <button type="submit">
                Send
            </button>

        </form>
    );
}

export default MessageInput;