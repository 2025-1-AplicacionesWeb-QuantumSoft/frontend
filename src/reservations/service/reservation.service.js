import axios from 'axios'

const API_BASE = 'http://localhost:3001'

export const getBabysitters = () => axios.get(`${API_BASE}/babysitter`)

