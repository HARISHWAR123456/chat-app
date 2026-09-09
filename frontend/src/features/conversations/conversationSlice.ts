import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ConversationService } from "../../services/chat/conversationsService";
import { ConversationFeature } from "./conversationsFeatures";

export const fetchConversationsList=createAsyncThunk("/conversation/fetchConversationsList",
    async(_,{rejectWithValue})=>{

        try {

            const response =
                await ConversationService.getConversations();

            return response;

        } catch (error) {

            return rejectWithValue(
                "Unable to fetch conversations"
            );
        }

    }
)

const conversationSlice=createSlice({
    name:"conversationList",
    initialState:ConversationFeature.initialState,
    reducers:{
        clearConversations(state) {
            state.conversations = [];
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchConversationsList.pending,(state)=>{
            state.loading= true;
            state.error=null;
        });
        
        builder.addCase(fetchConversationsList.fulfilled,(state,action)=>{
            state.loading=false;
            state.conversations=action.payload;
        })
        builder.addCase(fetchConversationsList.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string|| "failed to fetch ConversationList";
        })
    }
});

export const {clearConversations}=conversationSlice.actions;
export default conversationSlice.reducer;