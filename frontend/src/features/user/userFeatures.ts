// export namespace UserFeature{
//     export interface User{
//     id: number;
//     username: string;
//     email: string;
// }

// export interface UserState{
//     user:User|null;
//     loading:boolean;
//     error:string|null;
// }


// export const initialState: UserState = {
//         user: null,
//         loading: false,
//         error: null,
// }
// }

import { getAuth } from "../../services/common/authStorage";

export namespace UserFeature {

    export interface User {
        id: number;
        username: string;
        email: string;
    }

    export interface JwtPayload {
        id: number;
        username: string;
        email: string;
        exp?: number;
        iat?: number;
    }

    export interface LoginCredentials {
        email: string;
        password: string;
    }

    export interface AuthResponse {
        success: boolean;
        message: string;
        token: string;
        refreshToken: string;
    }

    export interface UserState {
        user: User | null;
        token: string | null;
        refreshToken: string | null;
        loading: boolean;
        error: string | null;
    }

export const initialState: UserState = {

    user: getAuth()?.user ?? null,

    token: getAuth()?.token ?? null,

    refreshToken:
        getAuth()?.refreshToken ?? null,

    loading: false,

    error: null,
};
}