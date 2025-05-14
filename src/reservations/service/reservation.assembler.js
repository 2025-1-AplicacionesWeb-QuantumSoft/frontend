import {Babysitter} from "@/reservations/model/babysitter.entity.js";
import {ReservationEntity} from "@/reservations/model/reservation.entity.js";
import {UserEntity} from "@/reservations/model/user.entity.js";

export class BabysitterAssembler {
    static toEntitiesFromResponse(response) {
        if (response.statusText !== "OK") {
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

export class ReservationAssembler {
    static toEntitiesFromResponse(response) {
        if (response.statusText !== "OK") {
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

        return new ReservationEntity(  {
            id: resource.id,
            start_time: resource.start_time,
            end_time: resource.end_time,
            status: resource.status,
            notification: resource.notification,
            parent_id: resource.parent_id,
            babysitter_id: resource.babysitter_id
        });
    }
}

export class UserAssembler {
    static toEntitiesFromResponse(response) {
        if (response.statusText !== "OK") {
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

        return new UserEntity(  {
            id: resource.id,
            name: resource.name,
            email: resource.email,
            phone: resource.phone,
            password: resource.password,
            role: resource.role,
            updated_at: resource.updated_at,
        });
    }
}