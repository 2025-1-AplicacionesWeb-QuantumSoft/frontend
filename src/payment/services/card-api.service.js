import axios from "axios";

const baseUrl = "http://localhost:3000";

const http = axios.create({
    baseURL: baseUrl,
});

export class CardApiService {
    getByUserId(userId) {
        return http
            .get(`/card?userId=${userId}`)
            .then(response => response.data)
            .catch(error => {
                console.error("Error al obtener tarjetas:", error);
                throw error;
            });
    }

    getCards() {
        return http.get("/card");
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

/*getCardsByUserId(userId, userType) {
    const params = userType === 'parent' ? { parent_id: userId } : { babysitter_id: userId };
    return http
        .get('/card?', { params })
        .then(response => response.data)
        .catch(error => {
            console.error('Error al obtener las tarjetas:', error);
            throw error;
        });


   getByUserId(userType, userId) {
    const param = userType === 'parent' ? 'parent_id' : 'babysitter_id';
    return http
      .get(`/cards?${param}=${userId}`)
      .then(response => response.data)
      .catch(error => {
        console.error("Error al obtener tarjetas:", error);
        throw error;
      });
  }

  updateCard(id, cardData) {
    return http
      .put(`/cards/${id}`, cardData)
      .then(response => response.data)
      .catch(error => {
        console.error("Error al actualizar tarjeta:", error);
        throw error;
      });
  }

  createCard(cardData) {
    return http
      .post('/cards', cardData)
      .then(response => response.data)
      .catch(error => {
        console.error("Error al crear tarjeta:", error);
        throw error;
      });
  }

  deleteCard(id) {
    return http
      .delete(`/cards/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error("Error al eliminar tarjeta:", error);
        throw error;
      });
  }
}*/