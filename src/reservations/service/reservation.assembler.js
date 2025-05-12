import {Babysitter} from "@/reservations/model/babysitter.entity.js";

export class BabysitterAssembler {
    static toEntitiesFromResponse(response) {
        if (response.statusText !== "OK") {
            console.error(`${response.status}, ${response.code}, ${response.message}`);
            return [];
        }
        const itemsResponse = response;
        console.log("Items response", itemsResponse);

        return itemsResponse.map((character) => {
            return this.toEntityFromResponse(character);
        });
    }
    static toEntityFromResponse(resource) {

        return new Babysitter(  {
            id: resource.id,
            user_id: resource.user_id,
            description: resource.description,
            experience: resource.experience,
            languages: resource.languages,
            rating: resource.rating,
            verified: resource.verified,
            location: resource.location,
            accountBank: resource.accountBank,
            bankName: resource.bankName,
            typeAccountBank: resource.typeAccountBank,
            dni: resource.dni
        });
    }
}
