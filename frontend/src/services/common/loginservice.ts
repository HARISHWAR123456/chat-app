import { SPRING_API_URL } from "../../config";
import {UserFeature} from "../../features/user/userFeatures";


export async function LoginService(credentials: UserFeature.LoginCredentials): Promise<UserFeature.AuthResponse> {

    const response = await fetch(
        `${SPRING_API_URL}/api/auth/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(credentials),
        }
    );

    const data: UserFeature.AuthResponse = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
}