import {Babysitter} from "../model/babysitter.entity.js";

export class BabysitterAssembler {
    static toEntitiesFromResponse(response) {
        if (!response || response.status !== 200 || !Array.isArray(response.data)) {
            console.error(`Error en la respuesta: ${response?.status || "Estado desconocido"}, ${response?.message || "Sin mensaje"}`);
            return [];
        }

        console.log("Items response", response.data);

        return response.data.map((character) => {
            return this.toEntityFromResponse(character);
        });
    }

    static toEntityFromResponse(resource) {
        if (!resource || !resource.id || !resource.user_id || !resource.name) {
            console.error("Estructura de recurso inválida", resource);
            return null;
        }

        return new Babysitter({
            id: resource.id,
            user_id: resource.user_id,
            name: resource.name,
            email: resource.email,
            phone: resource.phone,
            location: resource.location,
            experience: resource.experience,
            description: resource.description,
            rating: resource.rating,
        });
    }
}
