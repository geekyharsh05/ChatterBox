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