// src/registration-services/service/registration.service.js
import axios from 'axios';
import { BabysitterAssembler } from './registration.assembler.js';

const API_BASE = 'http://localhost:3000';
//const API_BASE = import.meta.env.VITE_API_BASE_URL;

export class BabysitterService {
    static async getBabysitters() {
        try {
            const response = await axios.get(`${API_BASE}/babysitter`);
            return BabysitterAssembler.toEntitiesFromResponse(response);
        } catch (error) {
            console.error("Error al obtener babysitters:", error);
            return [];
        }
    }

    static async getBabysitterById(id) {
        try {
            const response = await axios.get(`${API_BASE}/babysitter/${id}`);
            return BabysitterAssembler.toEntityFromResponse(response.data);
        } catch (error) {
            console.error("Error al obtener babysitter por ID:", error);
            return null;
        }
    }
}