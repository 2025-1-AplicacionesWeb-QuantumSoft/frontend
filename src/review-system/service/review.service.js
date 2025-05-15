// src/review-system/service/review.service.js
import axios from 'axios'
import {ReviewAssembler} from "@/review-system/service/review.assembler.js";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
/*const API_BASE = 'http://localhost:3001'*/

export class ReviewService {
    static async getReviews() {
        const response = await axios.get(`${API_BASE}/review`)
        console.log("Reviews", response)
        return ReviewAssembler.toEntitiesFromResponse(response)
    }
}

export const getReviewById = (id) => axios.get(`${API_BASE}/reviews/${id}`)

export const createReview = (review) => axios.post(`${API_BASE}/reviews`, review)

export const updateReview = (id, review) => axios.put(`${API_BASE}/reviews/${id}`, review)

export const deleteReview = (id) => axios.delete(`${API_BASE}/reviews/${id}`)