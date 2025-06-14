import {Review} from "@/review-system/model/review.entity.js";

export class ReviewAssembler {
    static toEntitiesFromResponse(itemsResponse) {
        if (!Array.isArray(itemsResponse)) {
            console.error("La respuesta no es un array");
            return [];
        }
        return itemsResponse.map((item) => this.toEntityFromResponse(item));
    }

    static toEntityFromResponse(resource) {
        return new Review({
            id: resource.id || '',
            parentId: resource.parentId || '',
            babysitterId: resource.babysitterId || '',
            comment: resource.comment || '',
            rating: resource.rating || 0,
            date: resource.date ? new Date(resource.date) : new Date(),
        });
    }
}