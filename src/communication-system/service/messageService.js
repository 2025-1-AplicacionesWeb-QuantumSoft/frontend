import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
/*const API_BASE = "http://localhost:3000";*/

export const getMessagesByChatSession = async (sessionId) => {
    const response = await axios.get(`${API_BASE}/message?chat_sessions_id=${sessionId}`);
    return response.data;
};
