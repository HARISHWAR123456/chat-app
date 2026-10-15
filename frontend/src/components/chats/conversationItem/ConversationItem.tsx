import type { Conversation } from "../../../model/common/chats";
import { getAvatarGradient, getInitials } from "../../../utils/avatar";
import { formatRelativeTime } from "../../../utils/formatters";
import { Users } from "lucide-react";
import "../conversationList/ConversationList.css";

type ConversationItemProps = {
  conversation: Conversation;
  selected: boolean;
  onClick: () => void;
};

function ConversationItem({
  conversation,
  selected,
  onClick,
}: ConversationItemProps) {
  const gradient = getAvatarGradient(conversation.conversationId || conversation.name);
  const initials = getInitials(conversation.name);
  const timeFormatted = formatRelativeTime(conversation.lastMessageTime);

  return (
    <button
      className={`conversation-item ${selected ? "selected" : ""}`}
      onClick={onClick}
      type="button"
      aria-selected={selected}
    >
      <div className="conversation-avatar" style={{ background: gradient }}>
        {conversation.groupChat ? (
          <Users size={18} color="#ffffff" />
        ) : (
          <span>{initials}</span>
        )}
        <span className="online-dot" />
      </div>

      <div className="conversation-info">
        <div className="conversation-top">
          <strong title={conversation.name}>{conversation.name}</strong>
          {timeFormatted && <span className="conversation-time">{timeFormatted}</span>}
        </div>

        <p className="conversation-last-msg">
          {conversation.lastMessage || (
            <span className="empty-message-hint">No messages yet</span>
          )}
        </p>
      </div>

      {selected && <div className="selected-glow-bar" />}
    </button>
  );
}

export default ConversationItem;