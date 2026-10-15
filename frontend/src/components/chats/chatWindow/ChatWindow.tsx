import type { Conversation } from "../../../model/common/chats";
import MessageList from "../messageList/MessagList";
import MessageInput from "../messageInput/MessageInput";
import { GetMessages } from "../../../model/common/messages";
import { getAvatarGradient, getInitials } from "../../../utils/avatar";
import {
  ArrowLeft,
  Users,
  Phone,
  Video,
  MoreVertical,
  Sparkles,
  MessageSquarePlus,
} from "lucide-react";
import "./ChatWindow.css";

type ChatWindowProps = {
  conversation: Conversation | null;
  messages: GetMessages.Message[];
  loading: boolean;
  error: string | null;
  isTyping?: boolean;
  onBack?: () => void;
  onOpenNewChat?: () => void;
};

function ChatWindow({
  conversation,
  messages,
  loading,
  error,
  isTyping = false,
  onBack,
  onOpenNewChat,
}: ChatWindowProps) {
  if (!conversation) {
    return (
      <section className="chat-window empty-chat">
        <div className="empty-chat-card animate-fade-in">
          <div className="empty-chat-halo">
            <div className="empty-chat-icon-box">
              <Sparkles size={32} />
            </div>
          </div>

          <h2>Your Conversations Hub</h2>
          <p>
            Choose a thread from the left or connect instantly with colleagues
            and friends.
          </p>

          <div className="empty-chat-actions">
            {onOpenNewChat && (
              <button
                type="button"
                className="empty-cta-btn"
                onClick={onOpenNewChat}
              >
                <MessageSquarePlus size={16} />
                <span>Start New Chat</span>
                <kbd>⌘K</kbd>
              </button>
            )}
          </div>

          <div className="empty-features-strip">
            <div className="feature-pill">⚡ Real-time Sockets</div>
            <div className="feature-pill">🔒 End-to-End JWT</div>
            <div className="feature-pill">💬 Fluid Experience</div>
          </div>
        </div>
      </section>
    );
  }

  const gradient = getAvatarGradient(
    conversation.conversationId || conversation.name
  );
  const initials = getInitials(conversation.name);

  return (
    <section className="chat-window">
      {/* Top Header */}
      <header className="chat-header">
        <div className="chat-header-left">
          {onBack && (
            <button
              type="button"
              className="chat-back-btn"
              onClick={onBack}
              aria-label="Back to conversations list"
              title="Back to conversations"
            >
              <ArrowLeft size={18} />
            </button>
          )}

          <div className="chat-user-avatar" style={{ background: gradient }}>
            {conversation.groupChat ? (
              <Users size={18} color="#ffffff" />
            ) : (
              <span>{initials}</span>
            )}
            <span className="online-dot" />
          </div>

          <div className="chat-header-info">
            <h3>{conversation.name}</h3>
            <span className="chat-status-text">
              <span className="live-pulse" />
              {isTyping ? "typing..." : "Active now"}
            </span>
          </div>
        </div>

        <div className="chat-header-actions">
          <button
            type="button"
            className="chat-action-btn"
            aria-label="Start voice call"
            title="Voice call (feature preview)"
            onClick={() => alert("Voice calling will be available soon!")}
          >
            <Phone size={17} />
          </button>
          <button
            type="button"
            className="chat-action-btn"
            aria-label="Start video call"
            title="Video call (feature preview)"
            onClick={() => alert("Video calling will be available soon!")}
          >
            <Video size={17} />
          </button>
          <button
            type="button"
            className="chat-action-btn"
            aria-label="Conversation options"
            title="More options"
          >
            <MoreVertical size={17} />
          </button>
        </div>
      </header>

      {/* Message List */}
      <MessageList
        messages={messages}
        loading={loading}
        error={error}
        isTyping={isTyping}
        typingUserName={conversation.name}
      />

      {/* Message Input Dock */}
      <MessageInput conversationId={conversation.conversationId} />
    </section>
  );
}

export default ChatWindow;