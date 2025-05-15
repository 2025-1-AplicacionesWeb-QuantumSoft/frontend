import {Parent} from "@/review-system/model/parent.entity.js";
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

    static toEntityFromResponse(resource) {
        return new Review({
            id: resource.id,
            parentId: resource.parent_id,
            babysitterId: resource.babysitter_id,
            comment: resource.comment,
            rating: resource.rating,
            date: resource.date,
        });
    }
}