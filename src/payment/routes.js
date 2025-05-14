import PaymentHistory from "@/payment/pages/payment-history.page.vue";
import PaymentPage from "@/payment/pages/payment-page.page.vue";
export default [
    {
        path: "/payment/history",
        name: "payment",
        component: PaymentHistory,
    },
    {
        path: "/payment",
        name: 'BabysitterDetail',
        component: PaymentPage,
    }
]