import axios from "axios";

const API_URL = "http://localhost:3000";

export const getMessagesByChatSession = async (sessionId) => {
    const response = await axios.get(`${API_URL}/message?chat_sessions_id=${sessionId}`);
    return response.data;
};
