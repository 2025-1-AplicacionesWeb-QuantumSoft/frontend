import {Parent} from "@/review-system/model/parent.entity.js";

export class ParentAssembler {
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
        return new Parent(
            resource.id,
            resource.user_id,
            resource.address,
            resource.city,
            resource.children_count,
            resource.preferences
        );
    }
}