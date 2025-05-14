import { createRouter, createWebHistory } from 'vue-router'
import reservationRoutes from '@/reservations/routes.js'
import paymentRoutes from '@/payment/routes.js'
import Layout from '@/shared/Layout.component.vue'



const routes = [
        {
            path: '/',
            component: Layout,
            children: [
                ...reservationRoutes,
                ...paymentRoutes,

            ]
        }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
