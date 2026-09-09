import type { GetMessages } from "../../model/common/messages";

export namespace MessageFeature {

    export interface MessageState {
        messages: GetMessages.Message[];
        currentPage: number;
        totalPages: number;
        totalElements: number;
        hasNext: boolean;
        loading: boolean;
        error: string | null;
    }

    export const initialState: MessageState = {
        messages: [],
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        hasNext: false,
        loading: false,
        error: null,
    };
}