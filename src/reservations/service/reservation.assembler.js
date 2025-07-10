import {Babysitter} from "@/reservations/model/babysitter.entity.js";
import {ReservationEntity} from "@/reservations/model/reservation.entity.js";
import {UserEntity} from "@/reservations/model/user.entity.js";
import {Parent} from "@/payment/model/parent.entity.js";
import {CardEntity} from "@/reservations/model/card.entity.js";

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

export class ReservationAssembler {
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

        return new ReservationEntity(  {
            id: resource.id,
            startTime: resource.startTime,
            endTime: resource.endTime,
            status: resource.status,
            notificationId: resource.notificationId,
            parentId: resource.parentId,
            babysitterId: resource.babysitterId,
            address: resource.address,
            frequency: resource.frequency,
            childName: resource.childName,
            childAge: resource.childAge,
            specialNeeds: resource.specialNeeds,
            additionalInfo: resource.additionalInfo,
            createdAt: resource.createdAt,
        });
    }
}
export class CardsAssembler {
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
        return new CardEntity({
            id: resource.id,
            parentId: resource.parentId,
            babysitterId: resource.babysitterId,
            cardNumber: resource.cardNumber.number,
            cardHolder: resource.cardHolder,
            cvv: resource.cvv?.code ?? '',
            expirationDate: resource.expirationDate?.date ?? ''
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