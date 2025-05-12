import axios from "axios";
import {Parent} from "@/payment/model/parent.entity.js";
import {Reservation} from "@/payment/model/reservation.entity.js";

const baseurl = "http://localhost:3000";


const http = axios.create({
    baseURL: baseurl,
});

export  class PaymentApiService{
    getAll(){
        return http.get("/payment")
    }

    getPayments(){
        return http.get("/payment")
    }


    getPaymentByUserId(userType, userId){
        const params = userType === 'parent'
            ? { parent_id: userId }
            : { babysitter_id: userId };
        return http.get("/payment",{params:params})
            .then(async (res) => {
                // Proceso para obtener las relaciones manualmente
                const expandedPayments = await Promise.all(res.data.map(async (payment) => {
                    let reservation = null;
                    // Si tiene un reservation_id, obtenemos los detalles de la reserva
                    if (payment.reservation_id) {
                        const reservationResponse = await http.get(`/reservation/${payment.reservation_id}`);
                        reservation = new Reservation(reservationResponse.data);
                    }

                    return {
                        ...payment,
                        reservation,
                        parent: payment.parent_id ? new Parent(payment.parent_id) : null
                    };
                }));
                return expandedPayments;
            })
            .catch(error => {
                console.error("Error al obtener pagos:", error);
            });
    }

}

/*
getByTutorId(){
        return http.get(`/payment?`,{params: {
            parent_id:tutorId,
            }}).then(response=>response.data.map(payment=> new Payment(
                payment.parent_id,
                payment.
        )));
    }

*/