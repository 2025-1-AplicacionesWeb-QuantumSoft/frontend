import axios from 'axios'

const API_BASE = 'http://localhost:3001'

export const getParents = () => axios.get(`${API_BASE}/parents`)//Por implementar

