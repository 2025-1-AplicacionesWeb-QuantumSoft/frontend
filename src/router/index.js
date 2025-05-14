import { createRouter, createWebHistory } from 'vue-router'
import reservationRoutes from '@/reservations/routes.js'
import Layout from '@/shared/Layout.component.vue'
import BabysitterProfile from "@/registration-services/views/BabysitterProfile.vue";

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {path:"/babysitter-profile", component:BabysitterProfile}
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
