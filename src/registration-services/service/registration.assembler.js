import { Babysitter } from "../model/babysitter.entity.js";

export class BabysitterAssembler {
    static toEntitiesFromResponse(response) {
        if (!response || response.status !== 200 || !Array.isArray(response.data)) {
            console.error(`Error en la respuesta: ${response?.status || "Estado desconocido"}, ${response?.message || "Sin mensaje"}`);
            return [];
        }

        console.log("Items response", response.data);

        return response.data
            .map((item, index) => {
                const entity = this.toEntityFromResponse(item);
                if (!entity) {
                    console.warn(`Elemento inválido en índice ${index}:`, item);
                }
                return entity;
            })
            .filter(Boolean); // elimina los nulls
    }

    static toEntityFromResponse(resource) {
        if (!resource || typeof resource !== "object") {
            console.error("Recurso no es un objeto válido", resource);
            return null;
        }

        const {
            id,
            user_id,
            description,
            experience,
            languages,
            rating,
            verified,
            location,
            accountBank,
            bankName,
            typeAccountBank,
            dni,
            phone,
            name,
            email,
            lastname,
            updateP,
            confirmP,
            about
        } = resource;

        if (!id || !user_id || !description) {
            console.warn("Recurso incompleto para Babysitter", { id, user_id, description });
            return null;
        }

        return new Babysitter({
            id,
            user_id,
            description,
            experience: experience || "",
            languages: languages ?? null,
            rating: rating ?? null,
            verified: verified ?? false,
            location: location || "",
            accountBank: accountBank || "",
            bankName: bankName || "",
            typeAccountBank: typeAccountBank || "",
            dni: dni || "",
            phone: phone || "",
            name: name || "",
            email: email || "",
            lastname: lastname || "",
            updateP: updateP || "",
            confirmP: confirmP || "",
            about: about || "",
        });
    }
}