import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";

import { MessageService } from "../../services/chat/messageService";

import { MessageFeature } from "./messageFeatures";
import { GetMessages } from "../../model/common/messages";

export const getMessages = createAsyncThunk(
    "messages/getMessages",

    async ({ conversationId, page = 0, size = 20,}: {conversationId: number; page?: number; size?: number, },
        { rejectWithValue }) => {

        try {
            return await MessageService.getMessages(conversationId, page, size);

        } catch (error) {

            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch messages"
            );
        }
    }
);
const messageSlice = createSlice({

    name: "messages",

    initialState: MessageFeature.initialState,

    reducers: {

        clearMessages(state) {

            state.messages = [];
            state.currentPage = 0;
            state.totalPages = 0;
            state.totalElements = 0;
            state.hasNext = false;
            state.error = null;

        },

        addMessage(state,action: PayloadAction<GetMessages.Message>) {
            state.messages.push(action.payload);
        },

    },

    extraReducers: (builder) => {

        builder.addCase(
            getMessages.pending,
            (state) => {

                state.loading = true;
                state.error = null;

            }
        );


        builder.addCase(
            getMessages.fulfilled,
            (state, action) => {

                state.loading = false;

                state.messages = action.payload.messages;

                state.currentPage =
                    action.payload.currentPage;

                state.totalPages =
                    action.payload.totalPages;

                state.totalElements =
                    action.payload.totalElements;

                state.hasNext =
                    action.payload.hasNext;

            }
        );


        builder.addCase(
            getMessages.rejected,
            (state, action) => {

                state.loading = false;

                state.error =
                    action.payload as string ||
                    "Failed to fetch messages";

            }
        );

    },
});

export const {
   clearMessages,
   addMessage
} = messageSlice.actions;

export default messageSlice.reducer;