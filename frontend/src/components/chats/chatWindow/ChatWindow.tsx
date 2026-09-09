import type { Conversation } from "../../../model/common/chats";
import MessageList from "../messageList/MessagList";
import MessageInput from "../messageInput/MessageInput";
import { GetMessages } from "../../../model/common/messages";

type ChatWindowProps = {
    conversation: Conversation | null;
    messages: GetMessages.Message[];
    loading: boolean;
    error: string | null;
};

function ChatWindow({
    conversation,messages,loading,error
}: ChatWindowProps) {

    if (!conversation) {

        return (
            <section className="chat-window empty-chat">

                <div>
                    <h2>Select a conversation</h2>

                    <p>
                        Choose a conversation from the
                        left to start chatting.
                    </p>
                </div>

            </section>
        );
    }


    return (
        <section className="chat-window">

            <header className="chat-header">

                <div className="chat-user-avatar">
                    {/* {conversation.avatar}

                    {conversation.online && (
                        <span className="online-dot" />
                    )} */}
                </div>

                <div>

                    <h3>
                        {conversation.name}
                    </h3>

                    <span>
                        {/* {conversation.online
                            ? "Online"
                            : "Offline"} */}
                    </span>

                </div>

            </header>


         <MessageList
    messages={messages}
    loading={loading}
    error={error}
/>


            <MessageInput  conversationId={conversation.conversationId} />

        </section>
    );
}

export default ChatWindow;