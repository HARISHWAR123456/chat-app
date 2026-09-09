import type { Conversation } from "../../../model/common/chats";

type ConversationItemProps = {
    conversation: Conversation;
    selected: boolean;
    onClick: () => void;
};

function ConversationItem({conversation,selected,onClick,}: ConversationItemProps) {

    return (
        <button
            className={`conversation-item ${
                selected ? "selected" : ""
            }`}
            onClick={onClick}
        >

            <div className="conversation-avatar">
                {/* {conversation.avatar}
                
                {conversation.online && (
                    <span className="online-dot" />
                )} */}
            </div>

            <div className="conversation-info">

                <div className="conversation-top">

                    <strong>
                        {conversation.name}
                    </strong>

                    <span>
                        {conversation.lastMessageTime}
                    </span>

                </div>

                <p>
                    {conversation.lastMessage}
                </p>

            </div>

        </button>
    );
}

export default ConversationItem;