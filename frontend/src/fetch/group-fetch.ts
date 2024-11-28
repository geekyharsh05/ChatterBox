import { API_ENDPOINTS } from "@/lib/api-auth-routes";

export async function fetchChatGroups(token: string) {
    const res = await fetch(API_ENDPOINTS.CHAT_GROUP, {
        headers: {
            Authorization: token
        },
        next: {
            revalidate: 60*60,
            tags: ["dashboard"]
        }
    })

    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    const response = await res.json()
    if (response?.data) {
        return response?.data
    }

    return [];
}

export async function fetchChatGroup(id: string) {
    const res = await fetch(`${API_ENDPOINTS.CHAT_GROUP}/${id}`, {
        cache: "no-cache"
    })

    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    const response = await res.json()
    if (response?.data) {
        return response?.data
    }

    return null;
}

export async function fetchChatGroupUsers(id: string) {
    const res = await fetch(`${API_ENDPOINTS.CHAT_GROUP_USERS}?group_id=${id}`, {
      cache: "no-cache",
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Fetch error:", errorText);
      throw new Error("Failed to fetch data");
    }

    const response = await res.json();
    if (response?.data) {
      return response?.data;
    }

    return [];
  }