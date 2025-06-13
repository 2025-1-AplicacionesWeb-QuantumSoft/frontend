import { createRouter, createWebHistory } from 'vue-router'
import reservationRoutes from '@/reservations/routes.js'
import Layout from '@/shared/Layout.component.vue'
import ReviewList from '@/review-system/components/reviewList.vue'
import reviewManagementComponent from "@/review-system/pages/review.management.component.vue";


const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            ...reservationRoutes,
            {
                path: '/reviews',
                component: reviewManagementComponent,
                name: 'Reviews'
            }
            // otras rutas de bounded context
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router