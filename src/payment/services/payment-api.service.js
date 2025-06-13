import axios from "axios";
import {Parent} from "@/payment/model/parent.entity.js";
import {Reservation} from "@/payment/model/reservation.entity.js";

const baseurl = import.meta.env.VITE_API_BASE_URL;

console.log("baseurl:",baseurl);
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


    getPaymentByUserId(role, userId){
        const params =
            role === 'parent' ? { parent_id: userId } : { babysitter_id: userId };

        return http.get("/payment",{params:params})
            .then(async (res) => {
                const payments = res.data?.data|| res.data;

                if (!payments || payments.length === 0) {
                    return [];
                }
                const expandedPayments = await Promise.all(
                    payments.map(async (payment) => {
                    let reservation = null;
                    let relatedUser = null;
                    let cardNumber = 'N/A'

                    if (payment.reservation_id) {
                        try {
                            const reservationResponse = await http.get(`/reservation/${payment.reservation_id}`);
                            reservation = new Reservation(reservationResponse.data);

                            if (role === "parent") {
                                if (reservation.babysitter_id) {
                                    const babysitterResponse = await http.get(`/babysitter/${reservation.babysitter_id}`);
                                    const userResponse = await http.get(`/user/${babysitterResponse.data.user_id}`);
                                    relatedUser = userResponse.data;

                                    console.log("Datos que llegan:", relatedUser);
                                }
                            } else if (role === "babysitter") {
                                if (reservation.parent_id) {
                                    const parentResponse = await http.get(`/parent/${reservation.parent_id}`);
                                    const userResponse = await http.get(`/user/${parentResponse.data.user_id}`)
                                    relatedUser = userResponse.data;
                                    console.log("Datos que llegan:", relatedUser);
                                }
                            }

                            if (payment.paymentMethod && payment.paymentMethod.cardId) {
                                try {
                                    const cardResponse = await http.get(`/card/${payment.paymentMethod.cardId}`);
                                    cardNumber = cardResponse.data.cardNumber;
                                    console.log("Número de tarjeta encontrado:", cardNumber);
                                } catch (error) {
                                    console.log("Error al obtener número de tarjeta:", error);
                                }
                            }
                        } catch (error) {
                            console.log("Error al Obtener reserva",error);
                        }

                    }

                    return {
                        ...payment,
                        reservation,
                        relatedUser,
                        cardNumber,
                    };
                }));
                console.log("Pagos procesados", expandedPayments);
                return expandedPayments;
            })
            .catch(error => {
                console.error("Error al obtener pagos:", error);
                return [];
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