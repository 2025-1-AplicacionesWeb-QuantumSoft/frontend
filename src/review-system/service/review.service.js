// src/review-system/service/review.service.js
import axios from 'axios'

const API_BASE = 'http://localhost:3001'

export const getReviews = () => axios.get(`${API_BASE}/reviews`)

export const getReviewById = (id) => axios.get(`${API_BASE}/reviews/${id}`)

export const createReview = (review) => axios.post(`${API_BASE}/reviews`, review)

export const updateReview = (id, review) => axios.put(`${API_BASE}/reviews/${id}`, review)

export const deleteReview = (id) => axios.delete(`${API_BASE}/reviews/${id}`)