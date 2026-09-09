import { UserFeature } from "../../features/user/userFeatures";

const USER_KEY = "user";
const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";


export function saveAuth(user: UserFeature.User,token: string,refreshToken: string) {

    localStorage.setItem( USER_KEY, JSON.stringify(user) );
    localStorage.setItem( TOKEN_KEY, token);
    localStorage.setItem( REFRESH_TOKEN_KEY, refreshToken);
}


export function getAuth() {

    const user = localStorage.getItem(USER_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!user || !token || !refreshToken) {
        return null;
    }

    return {
        user: JSON.parse(user) as UserFeature.User,
        token,
        refreshToken,
    };
}


export function clearAuth() {

    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}