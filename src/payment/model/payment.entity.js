import {Reservation} from "@/payment/model/reservation.entity.js";
import {Parent} from "@/payment/model/parent.entity.js";

export class Payment {
    constructor({
        id="",
        amount = "",
        status = "",
        created_at="",
        reservation_id = null,
        parent_id = null,
        paymentMethod={}
                }) {
        this.id = id;
        this.amount = amount;
        this.status = status;
        this.created_at = created_at;
        this.reservation_id = reservation_id;
        this.parent_id = parent_id;
        this.paymentMethod = paymentMethod;
    }

    getFormatedCreatedAt(){
        return new Date(this.created_at).toLocaleDateString("en-US",{
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
}