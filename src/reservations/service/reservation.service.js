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
        const response = await axios.get(`${API_BASE}reservation/${id}`)
        console.log("Reservations", response)
        return ReservationAssembler.toEntityFromResponse(response.data)
    }
    static async getReservationByBabysitterId(id) {
        const response = await axios.get(`${API_BASE}reservation/babysitter/${id}`)
        console.log("Reservations", response.data)
        return ReservationAssembler.toEntitiesFromResponse(response)
    }
    static async getReservationByParentId(id) {
        const response = await axios.get(`${API_BASE}reservation/parent/${id}`)
        console.log("Reservations", response.data)
        return ReservationAssembler.toEntitiesFromResponse(response)
    }
    static async createReservation(reservation) {
        const response = await axios.post(`${API_BASE}reservation`, reservation)
        console.log("Create Reservation", response)
        return ReservationAssembler.toEntityFromResponse(response.data)
    }
    static async updateReservation(reservation, reservationId) {
        const response = await axios.put(`${API_BASE}reservation/${reservationId}`, reservation)
        console.log("Update Reservation", response)
        return ReservationAssembler.toEntityFromResponse(response.data)
    }
    static async deleteReservation(id) {
        const response = await axios.delete(`${API_BASE}reservation/${id}`)
        console.log("Delete Reservation", response)
        return response.data
    }
}