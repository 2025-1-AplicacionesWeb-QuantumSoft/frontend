import axios from "axios";

const httpInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export default httpInstance;