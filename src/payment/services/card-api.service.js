import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
    baseURL: baseUrl,
});

export class CardApiService {
    getByUserId(userId) {
        return http
            .get(`/card?parent_id=${userId}`)
            .then(response => response.data)
            .catch(error => {
                console.error("Error al obtener tarjetas:", error);
                throw error;
            });
    }

    getCards() {
        return http.get("/card");
    }

    getCardById(cardId){
        return http.get(`/card/${cardId}`)
            .then(response => response.data)
            .catch(error => {
                console.error("Error al obtener tarjeta por ID:", error);
                throw error;
            });
    }

    updateCard(id, cardData) {
        return http
            .put(`/card/${id}`, cardData)
            .then(response => response.data)
            .catch(error => {
                console.error("Error al actualizar tarjeta:", error);
                throw error;
            });
    }

    createCard(cardData) {
        return http
            .post('/card', cardData)
            .then(response => response.data)
            .catch(error => {
                console.error("Error al crear tarjeta:", error);
                throw error;
            });
    }

    deleteCard(id) {
        return http
            .delete(`/card/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error("Error al eliminar tarjeta:", error);
                throw error;
            });
    }
}
