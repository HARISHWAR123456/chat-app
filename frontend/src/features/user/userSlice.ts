import { createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import { UserFeature } from "./userFeatures";
import { jwtDecode } from "jwt-decode";
import { LoginService } from "../../services/common/loginservice";


export const loginUser = createAsyncThunk(
    "user/loginUser",

    async (credentials: UserFeature.LoginCredentials ,{rejectWithValue}) => {

        try{
            const data=await LoginService(credentials);
   
            const decoded=jwtDecode<UserFeature.JwtPayload>(data.token)

            const user: UserFeature.User = {
                id: decoded.id,
                username: decoded.username,
                email: decoded.email,
            };

            return {
                user,
                token: data.token,
                refreshToken: data.refreshToken,
            };
        }catch(error){
               return rejectWithValue(
                "Unable to connect to the server"
            );
        }
    }
);

const userSlice = createSlice({

    name: "user",

    initialState: UserFeature.initialState,

    reducers: {

        logout(state) {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.error = null;
        },

        clearError(state) {
            state.error = null;
        },

    },

    extraReducers: (builder) => {

        builder.addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.error = null;
        });

        builder.addCase(loginUser.fulfilled, (state, action) => {

            state.loading = false;

            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;

        });

        builder.addCase(loginUser.rejected, (state, action) => {

            state.loading = false;

            state.error =
                action.payload as string ||
                "Login failed";
        });

    },
});

export const { logout ,clearError} = userSlice.actions;

export default userSlice.reducer;