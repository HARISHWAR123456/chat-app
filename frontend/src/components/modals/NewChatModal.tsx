import { useState, type FormEvent } from "react";
import { X, UserPlus, Sparkles, Loader2 } from "lucide-react";
import { ConversationService } from "../../services/chat/conversationsService";
import { useAppDispatch } from "../../app/hooks";
import { fetchConversationsList } from "../../features/conversations/conversationSlice";
import type { Conversation } from "../../model/common/chats";
import "./NewChatModal.css";

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConversationCreated?: (conversation: Conversation) => void;
}

export default function NewChatModal({
  isOpen,
  onClose,
  onConversationCreated,
}: NewChatModalProps) {
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const id = parseInt(userId.trim(), 10);
    if (isNaN(id) || id <= 0) {
      setError("Please enter a valid numeric User ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newConv = await ConversationService.createPrivateConversation(id);
      await dispatch(fetchConversationsList());
      if (onConversationCreated) {
        onConversationCreated(newConv);
      }
      onClose();
      setUserId("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to start conversation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-badge">
              <UserPlus size={18} />
            </div>
            <div>
              <h3>Start New Chat</h3>
              <p>Connect instantly with another user by ID</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-field">
            <label htmlFor="targetUserId">User ID</label>
            <div className="modal-input-wrap">
              <input
                id="targetUserId"
                type="number"
                min="1"
                placeholder="e.g. 2, 3..."
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  setError(null);
                }}
                autoFocus
                required
              />
            </div>
            <span className="modal-hint">
              <Sparkles size={13} />
              Tip: Enter the ID of the registered user you want to message
            </span>
          </div>

          {error && <div className="modal-error-badge">{error}</div>}

          <div className="modal-actions">
            <button
              type="button"
              className="modal-btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="modal-btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={16} className="spinning" />
                  <span>Connecting...</span>
                </>
              ) : (
                <span>Start Chat</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
