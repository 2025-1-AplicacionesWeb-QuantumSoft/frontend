import { createRouter, createWebHistory } from 'vue-router'
import reservationRoutes from '@/reservations/routes.js'
import paymentRoutes from '@/payment/routes.js'
import communicationRoutes from '@/communication-system/routes.js'
import registrationRoutes from '@/registration-services/routes.js'
import reviewRoutes from '@/review-system/routes.js'
import Layout from '@/shared/Layout.component.vue'
import authRoutes from '@/auth/routes.js'
import BabysitterDetail from "@/reservations/pages/BabysitterDetail.vue";
import logInComponent from "@/auth/components/log-in.component.vue";



const routes = [
        {
            path: '/',
            name: 'login',
             ...authRoutes,
        },
        {
            path: '/',
            component: Layout,
            children: [
                ...reservationRoutes,
                ...paymentRoutes,
                ...communicationRoutes,
                ...registrationRoutes,
                ...reviewRoutes

            ]
        }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router