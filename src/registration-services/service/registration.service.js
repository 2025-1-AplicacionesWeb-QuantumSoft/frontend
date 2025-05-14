import axios from 'axios';
import {BabysitterAssembler} from './registration.assembler.js';

const API_BASE = 'http://localhost:3000';

export const getBabysitters = async () => {
    try {
        const response = await axios.get(`${API_BASE}/babysitter`);
        return BabysitterAssembler.toEntitiesFromResponse(response);
    } catch (error) {
        console.error("Error al obtener babysitters:", error);
        return [];
    }
};