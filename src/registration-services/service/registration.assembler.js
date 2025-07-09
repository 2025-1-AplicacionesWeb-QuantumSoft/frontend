import {Babysitter} from "@/registration-services/model/babysitter.entity.js";
import {Parent} from "@/registration-services/model/parent.entity.js";

export class BabysitterAssembler {
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.code}, ${response.message}`);
            return [];
        }
        const itemsResponse = response.data;
        console.log("Items response", itemsResponse);

        return itemsResponse.map((item) => {
            return this.toEntityFromResponse(item);
        });
    }
    static toEntityFromResponse(resource) {

        return new Babysitter(  {
            id: resource.id,
            user_id: resource.user_id,
            name: resource.name,
            phone: resource.phone,
            description: resource.description,
            experienceLevel: resource.experienceLevel,
            languages: resource.languages,
            rating: resource.rating,
            location: resource.location,
            accountBank: resource.accountBank,
            bankName: resource.bankName,
            typeAccountBank: resource.typeAccountBank,
            dni: resource.dni
        });
    }
}

export class ParentAssembler {
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.code}, ${response.message}`);
            return [];
        }
        const itemsResponse = response.data;
        console.log("Items response", itemsResponse);

        return itemsResponse.map((item) => {
            return this.toEntityFromResponse(item);
        });
    }
    static toEntityFromResponse(resource) {

        return new Parent(  {
            id: resource.id,
            userId: resource.userId,
            address: resource.address,
            name: resource.name,
            phone: resource.phone,
            childrenCount: resource.childrenCount,
            preferences: resource.preferences,
            city: resource.city,
        });
    }
}