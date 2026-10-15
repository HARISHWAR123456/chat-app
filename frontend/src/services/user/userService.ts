import { SPRING_API_URL } from "../../config";
import type { UserFeature } from "../../features/user/userFeatures";

export const UserService = {
  async getProfile(): Promise<UserFeature.User> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${SPRING_API_URL}/api/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      throw new Error(err?.message || "Failed to fetch user profile");
    }

    return await response.json();
  },

  async updateUsername(username: string): Promise<UserFeature.User> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${SPRING_API_URL}/api/users/username`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      throw new Error(err?.message || "Failed to update username");
    }

    return await response.json();
  },
};
