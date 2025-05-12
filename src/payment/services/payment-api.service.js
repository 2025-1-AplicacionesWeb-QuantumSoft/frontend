import axios from "axios";
import {Card} from "./../model/card.entity.js";

const baseurl = "http://localhost:3000";


const http = axios.create({
    baseURL: baseurl,
});

export  class PaymentApiService{

    getPayments(){
        return http.get("/payment")
    }

    getPaymentByUserId(paymentId){
        const params = userType === 'parent' ? { parent_id: userId } : { babysitter_id: userId };
        return http.get(`/payment?`, {params: params})
    }


}