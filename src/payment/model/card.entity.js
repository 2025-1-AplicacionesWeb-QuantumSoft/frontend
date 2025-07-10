import {Parent} from "@/payment/model/parent.entity.js";
import {Babysitter} from "@/payment/model/babysitter.entity.js";

export class Card {
    constructor({
        id="",
        parentId = null,
        babysitterId = null,
        numberCard="",
        cardHolder="",
        code =0,
        month = 0,
        year = 0,
                }) {
        this.id = id;
        this.parentId = parentId ;
        this.babysitterId = babysitterId ;
        this.cardNumber=numberCard;
        this.cardHolder = cardHolder;
        this.cvv = code;
        this.expirationDate= {
            month: month,
            year: year,
        };
    }

    getFormattedExpirationDate() {
        return `${this.expirationDate.month.toString().padStart(2,'0')}/${this.expirationDate.year.toString().slice(-2)}`;
    }
}