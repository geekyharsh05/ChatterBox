import Env from "./env";

const BASE_URL = Env.BACKEND_URL;
const API_URL = `${BASE_URL}/api`;

export const API_ENDPOINTS = {
    LOGIN: `${API_URL}/auth/login`,
    CHAT_GROUP: `${API_URL}/chat-group`,
    CHAT_GROUP_USERS: `${API_URL}/chat-group-user`,
    CHATS_URL: `${API_URL}/chats`,
};