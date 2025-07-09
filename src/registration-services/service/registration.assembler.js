import { Babysitter } from "../model/babysitter.entity.js";

export class BabysitterAssembler {
    static toEntitiesFromResponse(response) {
        if (!response || response.status !== 200) {
            console.error(`${response?.status || "Estado desconocido"}, ${response?.message || "Sin mensaje"}`);
            return [];
        }
        const itemsResponse = response.data;
        console.log("Items response", itemsResponse);

        return Array.isArray(itemsResponse)
            ? itemsResponse.map(item => this.toEntityFromResponse(item)).filter(Boolean)
            : [];
    }

    static toEntityFromResponse(resource) {
        if (!resource || typeof resource !== "object") {
            console.error("Recurso no es un objeto válido", resource);
            return null;
        }

        return new Babysitter({
            id: resource.id,
            user_id: resource.user_id,
            description: resource.description,
            experience: resource.experience ?? "",
            languages: resource.languages ?? null,
            rating: resource.rating ?? null,
            verified: resource.verified ?? false,
            location: resource.location ?? "",
            accountBank: resource.accountBank ?? "",
            bankName: resource.bankName ?? "",
            typeAccountBank: resource.typeAccountBank ?? "",
            dni: resource.dni ?? "",
            phone: resource.phone ?? "",
            name: resource.name ?? "",
            email: resource.email ?? "",
            lastname: resource.lastname ?? "",
            updateP: resource.updateP ?? "",
            confirmP: resource.confirmP ?? "",
            about: resource.about ?? "",
        });
    }
}