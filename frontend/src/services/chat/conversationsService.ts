import { SPRING_API_URL } from "../../config";
import type { Conversation } from "../../model/common/chats";

export const ConversationService = {

    async getConversations(): Promise<Conversation[]> {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `${SPRING_API_URL}/api/conversations/get-conversations`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch conversations");
        }

        return await response.json();
    },

    async createPrivateConversation(userId: number): Promise<Conversation> {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `${SPRING_API_URL}/api/conversations/private`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ userId }),
            }
        );

        if (!response.ok) {
            const err = await response.text();
            throw new Error(err || "Failed to create conversation");
        }

        return await response.json();
    },
};