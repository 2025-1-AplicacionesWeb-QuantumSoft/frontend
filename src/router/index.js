import { createRouter, createWebHistory } from 'vue-router'
import reservationRoutes from '@/reservations/routes.js'
import paymentRoutes from '@/payment/routes.js'
import communicationRoutes from '@/communication-system/routes.js'
import registrationRoutes from '@/registration-services/routes.js'
import reviewRoutes from '@/review-system/routes.js'
import reviewManagementComponent from "@/review-system/pages/review.management.component.vue";
import Layout from '@/shared/Layout.component.vue'
import BabysitterDetail from "@/reservations/pages/BabysitterDetail.vue";



const routes = [
        {
            path: '/',
            component: Layout,
            children: [
                ...reservationRoutes,
                ...paymentRoutes,
                ...communicationRoutes,
                ...registrationRoutes,
                {
                    path: '/reviews',
                    component: reviewManagementComponent,
                    name: 'Reviews'
                }
            ]
        }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router