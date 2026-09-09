import { SPRING_API_URL } from "../../config";
import type { GetMessages } from "../../model/common/messages";

export const MessageService = {

    async getMessages(conversationId: number,page: number = 0,size: number = 20): Promise<GetMessages.MessagePageResponse> {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `${SPRING_API_URL}/api/conversations/get-messages?conversationId=${conversationId}&page=${page}&size=${size}`,
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch messages");
        }

        return await response.json();
    },
};