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
                }) {
        this.id = id;
        this.amount = amount;
        this.status = status;
        this.created_at = created_at;
        this.reservation_id = reservation_id ? new Reservation(reservation_id) : null;
        this.parent_id = parent_id ? new Parent(parent_id) : null;
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