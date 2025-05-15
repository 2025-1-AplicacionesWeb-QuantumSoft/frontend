import PaymentHistory from "@/payment/pages/payment-history.page.vue";
import PaymentPage from "@/payment/pages/payment-page.page.vue";
export default [
    {
        path: "/payment/history",
        component: () => import("@/payment/pages/payment-history.page.vue"),
    },
    {
        path: "/payment",
        component: () => import("@/payment/pages/payment-page.page.vue"),
    }
]