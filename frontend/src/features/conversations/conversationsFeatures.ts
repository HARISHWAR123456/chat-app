// conversationFeatures.ts

import type { Conversation } from "../../model/common/chats";

export namespace ConversationFeature {

    export interface ConversationState {
        conversations: Conversation[];
        loading: boolean;
        error: string | null;
    }

    export const initialState: ConversationState = {
        conversations: [],
        loading: false,
        error: null,
    };
}