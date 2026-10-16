import { useEffect, useRef, useState, useMemo } from "react";
import { GetMessages } from "../../../model/common/messages";
import { useAppSelector } from "../../../app/hooks";
import { getAvatarGradient, getInitials } from "../../../utils/avatar";
import { formatMessageTime, formatMessageDateHeader } from "../../../utils/formatters";
import { CheckCheck, ChevronDown, MessageSquare } from "lucide-react";
import "./MessageList.css";

type MessageListProps = {
  messages: GetMessages.Message[];
  loading: boolean;
  error: string | null;
  isTyping?: boolean;
  typingUserName?: string;
};

function MessageList({
  messages,
  loading,
  error,
  isTyping = false,
  typingUserName,
}: MessageListProps) {
  const currentUser = useAppSelector((state) => state.user.user);
  const currentUserId = currentUser?.id;

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  // Group messages by calendar day
  const groupedMessages = useMemo(() => {
    const groups: { dateHeader: string; messages: GetMessages.Message[] }[] = [];
    let currentDateHeader = "";
    let currentGroup: GetMessages.Message[] = [];

    messages.forEach((msg) => {
      const header = formatMessageDateHeader(msg.createdAt) || "Earlier";
      if (header !== currentDateHeader) {
        if (currentGroup.length > 0) {
          groups.push({ dateHeader: currentDateHeader, messages: currentGroup });
        }
        currentDateHeader = header;
        currentGroup = [msg];
      } else {
        currentGroup.push(msg);
      }
    });

    if (currentGroup.length > 0) {
      groups.push({ dateHeader: currentDateHeader, messages: currentGroup });
    }

    return groups;
  }, [messages]);

  // Scroll to bottom helper
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
  };

  // Auto-scroll on initial load or when messages arrive
  useEffect(() => {
    scrollToBottom("smooth");
  }, [messages, isTyping]);

  // Handle scroll detection for the floating button
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isUp = scrollHeight - scrollTop - clientHeight > 180;
    setShowScrollBottom(isUp);
  };

  if (loading && messages.length === 0) {
    return (
      <div className="message-list-loading">
        <div className="skeleton-row theirs">
          <div className="skeleton-avatar" />
          <div className="skeleton-bubble" />
        </div>
        <div className="skeleton-row mine">
          <div className="skeleton-bubble" />
        </div>
        <div className="skeleton-row theirs">
          <div className="skeleton-avatar" />
          <div className="skeleton-bubble wide" />
        </div>
        <div className="skeleton-row mine">
          <div className="skeleton-bubble medium" />
        </div>
      </div>
    );
  }

  if (error && messages.length === 0) {
    return (
      <div className="message-list-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      className="message-list-wrap"
      ref={messagesContainerRef}
      onScroll={handleScroll}
    >
      <div className="message-list-content">
        {messages.length === 0 && !isTyping ? (
          <div className="no-messages-prompt animate-fade-in">
            <div className="no-messages-icon">
              <MessageSquare size={28} />
            </div>
            <h4>Conversation Started</h4>
            <p>Send a message below to break the ice and start chatting!</p>
          </div>
        ) : (
          groupedMessages.map((group, groupIdx) => (
            <div key={`group-${groupIdx}`} className="message-date-group">
              <div className="date-divider">
                <span>{group.dateHeader}</span>
              </div>

              {group.messages.map((message) => {
                const isMine =
                  currentUserId !== undefined
                    ? message.sender?.id === currentUserId
                    : false;

                const senderName = message.sender?.username || "Unknown";
                const senderInitials = getInitials(senderName);
                const senderGradient = getAvatarGradient(
                  message.sender?.id || senderName
                );
                const timeStr = formatMessageTime(message.createdAt);

                return (
                  <div
                    key={message.id}
                    className={`message-row ${isMine ? "mine" : "theirs"}`}
                  >
                    {!isMine && (
                      <div
                        className="message-sender-avatar"
                        style={{ background: senderGradient }}
                        title={senderName}
                      >
                        {senderInitials}
                      </div>
                    )}

                    <div className="message-bubble-wrap">
                      {!isMine && (
                        <span className="message-sender-name">
                          {senderName}
                        </span>
                      )}

                      <div className="message-bubble">
                        <p className="message-text">{message.content}</p>

                        <div className="message-meta">
                          {timeStr && (
                            <span className="message-time">{timeStr}</span>
                          )}
                          {isMine && (
                            <span className="message-check">
                              <CheckCheck size={14} />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}

        {/* Real-time typing indicator */}
        {isTyping && (
          <div className="message-row theirs typing-row animate-fade-in">
            <div className="message-sender-avatar typing-avatar">
              <span>...</span>
            </div>
            <div className="message-bubble typing-bubble">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
              {typingUserName && (
                <span className="typing-name">{typingUserName} is typing</span>
              )}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Scroll to Bottom button */}
      {showScrollBottom && (
        <button
          type="button"
          className="scroll-bottom-btn animate-fade-in"
          onClick={() => scrollToBottom("smooth")}
          aria-label="Scroll to newest messages"
          title="Scroll to bottom"
        >
          <ChevronDown size={18} />
        </button>
      )}
    </div>
  );
}

export default MessageList;