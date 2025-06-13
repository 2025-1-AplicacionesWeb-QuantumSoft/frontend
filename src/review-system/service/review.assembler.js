import {Review} from "@/review-system/model/review.entity.js";

export class ReviewAssembler {
    static toEntitiesFromResponse(response) {
        if (response.statusText !== "OK") {
            console.error(`${response.status}, ${response.code}, ${response.message}`);
            return [];
        }
        const itemsResponse = response;
        console.log("Items response", itemsResponse);

        return itemsResponse.map((item) => {
            return this.toEntityFromResponse(item);
        });
    }

    // review.assembler.js
    static toEntityFromResponse(resource) {
        return new Review({
            id: resource.id || '',
            parentId: resource.parent_id || '',
            reservationId: resource.reservations_id || '',
            comment: resource.comment || '',
            rating: resource.rating || 0,
            date: resource.created_at ? new Date(resource.created_at) : new Date(),
        });
    }
}