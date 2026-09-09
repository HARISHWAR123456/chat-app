import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice"
import conversationReducer from "../features/conversations/conversationSlice";
import messageReducer from "../features/messages/messageSlice";

export const store= configureStore({
    reducer:{
        user:userReducer,
        conversation:conversationReducer,
        message:messageReducer,
    }
});


export type RootState = ReturnType<typeof store.getState>;  //"Give me the type of whatever store.getState() returns."

export type AppDispatch = typeof store.dispatch;