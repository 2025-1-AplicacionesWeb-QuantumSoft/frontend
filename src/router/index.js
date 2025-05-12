import { createRouter, createWebHistory } from 'vue-router'
import reservationRoutes from '@/reservations/routes.js'
import Layout from '@/shared/Layout.component.vue'
import PaymentHistory from "@/payment/pages/payment-history.page.vue";


const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {path:"/payment", name:"payment", component: PaymentHistory, meta: {title: 'Payment History'}},
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
