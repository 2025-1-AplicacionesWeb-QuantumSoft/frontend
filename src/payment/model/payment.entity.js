import {Reservation} from "@/payment/model/reservation.entity.js";
import {Parent} from "@/payment/model/parent.entity.js";

export class Payment {
    constructor({
        id="",
        amount = "",
        cardId = null,
        status = "",
        createdAtDate="",
        reservationId = null,
        parentId = null, cardNumber = null, relatedUser = null
                }) {
        this.id = id;
        this.amount = amount;
        this.cardId = cardId;
        this.status = status;
        this.createdAtDate = createdAtDate;
        this.reservationId = reservationId;
        this.parentId = parentId;
        this.cardNumber = cardNumber;
        this.relatedUser = relatedUser;
    }
}