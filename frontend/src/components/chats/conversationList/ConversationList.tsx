import { Search } from "lucide-react";
import ConversationItem from "../conversationItem/ConversationItem";
import type { Conversation } from "../../../model/common/chats";

type ConversationListProps = {
    conversations: Conversation[];
    selectedConversation: Conversation | null;
    onSelectConversation: (
        conversation: Conversation
    ) => void;
};

function ConversationList({
    conversations,
    selectedConversation,
    onSelectConversation,
}: ConversationListProps) {

    return (
        <aside className="conversation-list">

            <div className="conversation-list-header">

                <h2>Conversations</h2>

                <span>
                    {conversations.length}
                </span>

            </div>


            <div className="conversation-search">

                <Search size={17} />

                <input
                    type="text"
                    placeholder="Search conversations..."
                />

            </div>


            <div className="conversation-items">

                {conversations.map((conversation) => (

                    <ConversationItem
                        key={conversation.conversationId}
                        conversation={conversation}
                        selected={
                            selectedConversation?.conversationId ===
                            conversation.conversationId
                        }
                        onClick={() =>
                            onSelectConversation(conversation)
                        }
                    />

                ))}

            </div>

        </aside>
    );
}

export default ConversationList;