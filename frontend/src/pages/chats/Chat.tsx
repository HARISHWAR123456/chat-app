import { useEffect, useState } from "react";
import ConversationList from "../../components/chats/conversationList/ConversationList";
import ChatWindow from "../../components/chats/chatWindow/ChatWindow";
import NewChatModal from "../../components/modals/NewChatModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { Conversation } from "../../model/common/chats";
import { fetchConversationsList } from "../../features/conversations/conversationSlice";
import { getMessages, addMessage } from "../../features/messages/messageSlice";
import { soundFX } from "../../utils/sound";
import {
  connectSocket,
  disconnectSocket,
  joinConversation,
  leaveConversation,
  onUserMessage,
  offUserMessage,
  onTyping,
  offTyping,
} from "../../services/socket/socket";
import { GetMessages } from "../../model/common/messages";
import "./Chat.css";

function Chat() {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.message.messages);
  const messageLoading = useAppSelector((state) => state.message.loading);
  const messageError = useAppSelector((state) => state.message.error);
  const conversations = useAppSelector(
    (state) => state.conversation.conversations
  );

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  // Connect socket and load conversation list
  useEffect(() => {
    connectSocket();
    dispatch(fetchConversationsList());

    return () => {
      disconnectSocket();
    };
  }, [dispatch]);

  // Real-time message listener
  useEffect(() => {
    const handleUserMessage = (message: GetMessages.Message) => {
      dispatch(addMessage(message));
      soundFX.playReceive();
      setIsOtherUserTyping(false);
      // Refresh conversations so last message snippet is updated
      dispatch(fetchConversationsList());
    };

    onUserMessage(handleUserMessage);
    return () => {
      offUserMessage(handleUserMessage);
    };
  }, [dispatch]);

  // Real-time typing listener
  useEffect(() => {
    const handleTyping = (data: { userId: number; active: boolean }) => {
      setIsOtherUserTyping(data.active);
    };

    onTyping(handleTyping);
    return () => {
      offTyping(handleTyping);
    };
  }, []);

  // Join/leave conversation room
  useEffect(() => {
    if (!selectedConversation) {
      return;
    }

    joinConversation(selectedConversation.conversationId);

    return () => {
      leaveConversation(selectedConversation.conversationId);
    };
  }, [selectedConversation]);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (!selectedConversation) {
      return;
    }

    dispatch(
      getMessages({
        conversationId: selectedConversation.conversationId,
        page: 0,
        size: 50,
      })
    );
  }, [selectedConversation, dispatch]);

  const handleSelectConversation = (conv: Conversation) => {
    setIsOtherUserTyping(false);
    setSelectedConversation(conv);
  };

  const handleBackToConversations = () => {
    setIsOtherUserTyping(false);
    setSelectedConversation(null);
  };

  return (
    <div className={`chat-page ${selectedConversation ? "has-active-chat" : ""}`}>
      {/* Conversations Column */}
      <div className="conversation-list-pane">
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
          onOpenNewChat={() => setIsNewChatModalOpen(true)}
        />
      </div>

      {/* Chat Window Column */}
      <div className="chat-window-pane">
        <ChatWindow
          conversation={selectedConversation}
          messages={messages}
          loading={messageLoading}
          error={messageError}
          isTyping={isOtherUserTyping}
          onBack={handleBackToConversations}
          onOpenNewChat={() => setIsNewChatModalOpen(true)}
        />
      </div>

      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onConversationCreated={(conv) => {
          setSelectedConversation(conv);
        }}
      />
    </div>
  );
}

export default Chat;