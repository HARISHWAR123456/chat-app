import { useState, useMemo } from "react";
import { Search, X, Plus, MessageSquarePlus, SearchX } from "lucide-react";
import ConversationItem from "../conversationItem/ConversationItem";
import type { Conversation } from "../../../model/common/chats";
import "./ConversationList.css";

type ConversationListProps = {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  onOpenNewChat?: () => void;
};

function ConversationList({
  conversations,
  selectedConversation,
  onSelectConversation,
  onOpenNewChat,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const query = searchQuery.toLowerCase().trim();
    return conversations.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        (c.lastMessage && c.lastMessage.toLowerCase().includes(query))
    );
  }, [conversations, searchQuery]);

  return (
    <aside className="conversation-list">
      {/* Header */}
      <div className="conversation-list-header">
        <div className="conv-title-group">
          <h2>Conversations</h2>
          <span className="conv-count-badge">{conversations.length}</span>
        </div>

        {onOpenNewChat && (
          <button
            type="button"
            className="btn-add-chat"
            onClick={onOpenNewChat}
            title="Start new chat"
            aria-label="New chat"
          >
            <Plus size={16} />
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="conversation-search-wrap">
        <div className="conversation-search">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Conversation Items List */}
      <div className="conversation-items">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.conversationId}
              conversation={conversation}
              selected={
                selectedConversation?.conversationId === conversation.conversationId
              }
              onClick={() => onSelectConversation(conversation)}
            />
          ))
        ) : searchQuery ? (
          /* Search Empty State */
          <div className="conversation-empty-state animate-fade-in">
            <div className="empty-state-icon">
              <SearchX size={24} />
            </div>
            <h4>No matches found</h4>
            <p>No chat matches "{searchQuery}"</p>
            <button
              type="button"
              className="empty-state-action"
              onClick={() => setSearchQuery("")}
            >
              Clear filter
            </button>
          </div>
        ) : (
          /* No Chats Empty State */
          <div className="conversation-empty-state animate-fade-in">
            <div className="empty-state-icon">
              <MessageSquarePlus size={24} />
            </div>
            <h4>No conversations yet</h4>
            <p>Start your first chat with a friend or colleague</p>
            {onOpenNewChat && (
              <button
                type="button"
                className="empty-state-action primary"
                onClick={onOpenNewChat}
              >
                Start a Chat
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

export default ConversationList;