import { API_ENDPOINTS } from "@/lib/api-auth-routes";

export async function fetchChats(groupId: string) {
  const res = await fetch(`${API_ENDPOINTS.CHATS_URL}/${groupId}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  
  return [];
}