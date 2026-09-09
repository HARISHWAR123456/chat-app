import type { UserFeature } from "../../features/user/userFeatures";

export interface Conversation {
    conversationId: number;
    name: string;
    groupChat: boolean;
    lastMessage: string | null;
    lastMessageTime: string | null;
}

export interface Message {
    id: number;
    content: string;
    createdAt: string;
    sender: UserFeature.User;
}