import axios from "axios";
import {Parent} from "@/payment/model/parent.entity.js";
import {Reservation} from "@/payment/model/reservation.entity.js";
import {useAuthenticationStore} from "@/iam/services/authentication.store.js";
import {BabysitterService} from "@/reservations/service/reservation.service.js";
import {CardApiService} from "@/payment/services/card-api.service.js";

const baseurl = import.meta.env.VITE_API_BASE_URL;

console.log("baseurl:",baseurl);
const http = axios.create({
    baseURL: baseurl,
});

export  class PaymentApiService{



    async getPaymentByParentId(parentId) {
        const authStore = useAuthenticationStore();
        const token = authStore.currentToken;  // Usamos el token de la tienda

        try {
            // Realizamos la llamada al backend con el token
            const response = await http.get(`payments/byparent/${parentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Asegurarnos de que payments sea siempre un array
            const payments = response.data?.data || response.data;

            // Si payments no es un array, lo convertimos a uno
            const paymentsArray = Array.isArray(payments) ? payments : [payments];

            console.log("Pagos obtenidos desde API:", paymentsArray);

            // Enriquecemos los pagos con la información extra de la niñera y tarjeta
            const enrichedPayments = await Promise.all(paymentsArray.map(async (payment) => {
                let cardNumber = null;   // Número de tarjeta
                let cardHolder = null;   // Titular de la tarjeta
                let relatedUser = null;

                // Obtener la niñera si existe el ID de reserva
                if (payment.reservationId) {
                    try {
                        const reservationResponse = await http.get(`/reservation/${payment.reservationId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        console.log("Reserva obtenida:", reservationResponse.data);
                        const babysitterId = reservationResponse.data.babysitterId?.value;
                        console.log("Babysitter ID:", babysitterId);
                        // Si hay un babysitterId, buscamos la información de la niñera
                        if (babysitterId) {
                            const babysitterResponse = await BabysitterService.getBabysitterById(babysitterId);
                            const userResponse = await http.get(`/babysitter/${babysitterResponse.id}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                            relatedUser = userResponse.data.name;
                        }
                    } catch (e) {
                        console.error("Error al obtener la niñera:", e);
                    }
                }

                // Obtener el número de tarjeta si existe
                if (payment.cardId) {
                    try {
                        const cardApiService = new CardApiService();
                        const cardResponse = await cardApiService.getCardById(payment.cardId);
                        console.log("Card Response:", cardResponse);

                        if (cardResponse && cardResponse.numberCard) {
                            cardNumber = cardResponse.numberCard;
                        } else {
                            console.error("Respuesta de tarjeta inválida o vacía:", cardResponse);
                        }

                        if (cardResponse && cardResponse.cardHolder) {
                            cardHolder = cardResponse.cardHolder; // Obtener el titular de la tarjeta
                        }
                    } catch (e) {
                        console.error("Error al obtener número de tarjeta:", e);
                    }
                }

                // Verifica el pago enriquecido
                console.log("Pago enriquecido:", { ...payment, relatedUser, cardNumber, cardHolder });

                // Devolver el pago enriquecido
                return {
                    ...payment,
                    relatedUser,
                    cardNumber,
                    cardHolder
                };
            }));

            return enrichedPayments;

        } catch (error) {
            console.error("Error al obtener pagos del parent:", error);
            return [];
        }
    }


}

/*
 getPaymentByParentId(parentId){
        const authStore = useAuthenticationStore();
        const token= authStore.currentToken;

        return http.get(`payments/byparent/${parentId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            const payments = res.data?.data || res.data;
            console.log("Pagos obtenidos desde API:", payments);
            return payments || [];
        }) .catch(error => {
                console.error("Error al obtener pagos del parent:", error);
                return [];
            });

    }

* */

/*
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
*/