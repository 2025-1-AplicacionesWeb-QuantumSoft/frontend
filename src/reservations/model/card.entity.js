import {Parent} from "@/payment/model/parent.entity.js";
import {Babysitter} from "@/reservations/model/babysitter.entity.js";

export class CardEntity {
    constructor({
                    id="",
                    parentId = null,
                    babysitterId = null,
                    cardNumber="",
                    cardHolder="",
                    cvv="",
                    expirationDate="",

                }) {
        this.id = id;
        this.parentId = parentId ? new Parent(parentId) : null;
        this.babysitterId = babysitterId ? new Babysitter(babysitterId) : null;
        this.cardNumber=cardNumber;
        this.cardHolder = cardHolder;
        this.cvv = cvv;
        this.expirationDate=expirationDate;

    }

    getFormattedExpirationDate(expirationDate) {
        return new Date(expirationDate).toLocaleDateString("en-US",{
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
        });
    }
}