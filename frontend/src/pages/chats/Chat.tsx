import { useEffect, useState } from "react";
import ConversationList from "../../components/chats/conversationList/ConversationList";
import ChatWindow from "../../components/chats/chatWindow/ChatWindow";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type {Conversation} from "../../model/common/chats";
import { fetchConversationsList } from "../../features/conversations/conversationSlice";
import { getMessages ,addMessage} from "../../features/messages/messageSlice";
import "./Chat.css";
import { connectSocket ,disconnectSocket ,joinConversation,leaveConversation ,onUserMessage,offUserMessage} from "../../services/socket/socket";
import { GetMessages } from "../../model/common/messages";


function Chat() {

    const dispatch = useAppDispatch();

    const messages = useAppSelector((state) => state.message.messages);

    const messageLoading=useAppSelector((state)=>state.message.loading);

    const messageError=useAppSelector((state)=>state.message.error);

    const conversations = useAppSelector(state => state.conversation.conversations);

    const [selectedConversation,setSelectedConversation] = useState<Conversation | null>(null);

useEffect(() => {

    console.log(
        "REDUX MESSAGES CHANGED:",
        messages
    );

}, [messages]);





  //socket connect
    useEffect(() => {
        connectSocket();

        dispatch(fetchConversationsList());
        
        return () => {
           disconnectSocket();
        };

    }, [dispatch]);


    // 2. Real-time message listener
useEffect(() => {

    const handleUserMessage = (
        message: GetMessages.Message
    ) => {

                console.log(
            "REAL-TIME MESSAGE RECEIVED:",
            message
        );

        dispatch(addMessage(message));

            console.log(
        "Dispatched addMessage"
    );

    };

    onUserMessage(handleUserMessage);

    return () => {
        offUserMessage(handleUserMessage);
    };

}, [dispatch]);

  //Selected conversation exists → socket joins its room.
useEffect(() => {

    if (!selectedConversation) {
        return;
    }

    joinConversation(
        selectedConversation.conversationId
    );

    return () => {

        leaveConversation(
            selectedConversation.conversationId
        );

    };

}, [selectedConversation]);


//Selected conversation changes → fetch its existing messages.
    useEffect(() => {
        if (!selectedConversation) {
            return;
        }

        dispatch( getMessages({
                conversationId: selectedConversation.conversationId,
                page: 0,
                size: 20,
            })
        );

    }, [selectedConversation, dispatch]);


    return (
        <div className="chat-page">

            <ConversationList
                conversations={conversations}
                selectedConversation={selectedConversation}
                onSelectConversation={
                    setSelectedConversation
                }
            />

            <ChatWindow
                conversation={selectedConversation}
                messages={messages}
                loading={messageLoading}
                error={messageError}
            />

        </div>
    );
}
export default Chat;