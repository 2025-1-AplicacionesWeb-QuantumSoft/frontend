import {Babysitter} from "../model/babysitter.entity.js";

export class BabysitterAssembler {
    static toEntitiesFromResponse(response) {
        if (!response || response.statusText !== "OK") {
            console.error(`${response?.status || "Unknown status"}, ${response?.code || "Unknown code"}, ${response?.message || "Unknown message"}`);
            return [];
        }

        const itemsResponse = Array.isArray(response.data) ? response.data : [];
        console.log("Items response", itemsResponse);

        return itemsResponse.map((character) => {
            return this.toEntityFromResponse(character);
        });
    }

    static toEntityFromResponse(resource) {
        if (!resource || !resource.id || !resource.user_id || !resource.name) {
            console.error("Invalid resource structure", resource);
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
