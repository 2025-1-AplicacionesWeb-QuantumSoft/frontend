import {Parent} from "@/payment/model/parent.entity.js";
import {Babysitter} from "@/payment/model/babysitter.entity.js";

export class Card {
    constructor({
        id="",
        parent_id = null,
        babysitter_id = null,
        cardNumber="",
        cardHolder="",
        cvv="",
        expirationDate="",

                }) {
        this.id = id;
        this.parent_id = parent_id;
        this.babysitter_id = babysitter_id;
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