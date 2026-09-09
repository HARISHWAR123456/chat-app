import type { Message } from "../../../model/common/chats";
import { GetMessages } from "../../../model/common/messages";

type MessageListProps = {
    messages: GetMessages.Message[];
    loading: boolean;
    error: string | null;
};

function MessageList({
    messages, loading ,error
}: MessageListProps) {


    console.log("MessageList received:", messages);

    const currentUserId = 1;

    return (
        <div className="message-list">

            {messages.map((message) => {

                const isMine =
                    message.sender.id === currentUserId;

                return (
                    <div
                        key={message.id}
                        className={`message-row ${
                            isMine ? "mine" : "theirs"
                        }`}
                    >

                        <div className="message-bubble">

                            <p>
                                {message.content}
                            </p>

                            <span>
                                {message.createdAt}
                            </span>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}

export default MessageList;