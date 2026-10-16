import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from "react";
import { sendMessage, sendTyping } from "../../../services/socket/socket";
import { soundFX } from "../../../utils/sound";
import { Send, Smile, Paperclip } from "lucide-react";
import "./MessageInput.css";

type MessageInputProps = {
  conversationId: number;
};

const QUICK_EMOJIS = ["👋", "👍", "❤️", "🔥", "😂", "✨", "🎉", "🚀", "🙌", "💯"];

function MessageInput({ conversationId }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Stop typing on unmount or conversation change
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      sendTyping(conversationId, false);
    };
  }, [conversationId]);

  const handleInputChange = (val: string) => {
    setMessage(val);

    // Send typing start
    sendTyping(conversationId, true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      sendTyping(conversationId, false);
    }, 1500);
  };

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();

    const trimmed = message.trim();
    if (!trimmed) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    sendTyping(conversationId, false);

    sendMessage(conversationId, trimmed);
    soundFX.playSend();

    setMessage("");
    setShowEmojis(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInsertEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmojis(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="message-input-area">
      {showEmojis && (
        <div className="emoji-picker-popover animate-slide-up">
          <div className="emoji-picker-title">Quick Reactions</div>
          <div className="emoji-grid">
            {QUICK_EMOJIS.map((em) => (
              <button
                key={em}
                type="button"
                className="emoji-btn"
                onClick={() => handleInsertEmoji(em)}
                aria-label={`Insert ${em}`}
              >
                {em}
              </button>
            ))}
          </div>
        </div>
      )}

      <form className="message-input-form" onSubmit={handleSubmit}>
        <div className="input-actions-left">
          <button
            type="button"
            className="input-tool-btn"
            onClick={() => setShowEmojis(!showEmojis)}
            aria-label="Add emoji reaction"
            title="Emoji picker"
          >
            <Smile size={19} />
          </button>
          <button
            type="button"
            className="input-tool-btn"
            aria-label="Attach file"
            title="Attach file (coming soon)"
            onClick={() => alert("File attachment will be available in the next release!")}
          >
            <Paperclip size={18} />
          </button>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Enter to send)"
          className="message-text-input"
          autoComplete="off"
        />

        <button
          type="submit"
          className="send-button"
          disabled={!message.trim()}
          aria-label="Send message"
          title="Send message"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;