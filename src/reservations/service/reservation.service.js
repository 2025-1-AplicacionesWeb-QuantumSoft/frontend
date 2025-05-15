import axios from 'axios'
import {BabysitterAssembler, ReservationAssembler} from "@/reservations/service/reservation.assembler.js";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
/*const API_BASE = 'http://localhost:3001'*/



export class BabysitterService {
    static async getBabysitters() {
        const response = await axios.get(`${API_BASE}/babysitter`)
        console.log("Babysitters", response)
        return BabysitterAssembler.toEntitiesFromResponse(response)
    }
    static async getBabysitterById(id) {
        const response = await axios.get(`${API_BASE}/babysitter/${id}`)
        console.log("Babysitter", response)
        return BabysitterAssembler.toEntityFromResponse(response.data)
    }
}


export class ReservationService {
    static async getReservations() {
        const response = await axios.get(`${API_BASE}/reservation`)
        console.log("Reservations", response)
        return ReservationAssembler.toEntitiesFromResponse(response)
    }
    static async getReservationById(id) {
        const response = await axios.get(`${API_BASE}/reservation/${id}`)
        console.log("Reservations", response)
        return ReservationAssembler.toEntityFromResponse(response.data)
    }
}