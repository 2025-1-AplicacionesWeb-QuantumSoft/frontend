import axios from "axios";
import {useAuthenticationStore} from "@/iam/services/authentication.store.js";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
    baseURL: baseUrl,
});

export class CardApiService {
     async getCardsByRole(role,roleId) {

        if (!role || !roleId) {
            throw new Error("Role y userId son necesarios.");
        }
        const authStore = useAuthenticationStore();
        const token = authStore.currentToken;

        let endpoint = "";
        if (role === "parent") {
            endpoint = `cards/parent/${roleId}`;
        } else if (role === "babysitter") {
            endpoint = `cards/babysitter/${roleId}`;
        } else {
            throw new Error("Rol no válido");
        }



        const url = `${baseUrl}${endpoint}`;
        console.log("URL construida:", url);

        try {
            const response = await http.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Respuesta de la API (tarjetas):", response.data);
            return response.data;
        } catch (error) {
            console.error("Error al obtener tarjetas:", error);
            if (error.response) {
                console.error("Detalles de la respuesta de error:", error.response.data);
            }
            throw error;
        }
    }

    getCardById(cardId){
        const authStore = useAuthenticationStore();
        const token = authStore.currentToken;

        return http.get(`/cards/${cardId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data)
            .catch(error => {
                console.error("Error al obtener tarjeta por ID:", error);
                throw error;
            });
    }

    updateCard(id, cardData) {
        const authStore = useAuthenticationStore();
        const token = authStore.currentToken;
        return http
            .put(`/cards/${id}`, cardData,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .catch(error => {
                console.error("Error al actualizar tarjeta:", error);
                throw error;
            });
    }

    createCard(cardData) {
         const authStore = useAuthenticationStore();
        const token = authStore.currentToken;
        console.log("TOKEN USADO:", token);

        return http
            .post('cards', cardData,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .catch(error => {
                console.error("Error al crear tarjeta:", error);
                throw error;
            });
    }

    deleteCard(id) {
        const authStore = useAuthenticationStore();
        const token = authStore.currentToken;

        return http
            .delete(`/cards/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => response.data)
            .catch(error => {
                console.error("Error al eliminar tarjeta:", error);
                throw error;
            });
    }
}
