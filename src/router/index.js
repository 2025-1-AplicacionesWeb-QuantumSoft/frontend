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
import Dashboard from "@/public/Dashboard.vue";
import SignInComponent from "@/iam/pages/sign-in.component.vue";
import IAMRoutes from "@/iam/routes.js";
import {authenticationGuard} from "@/iam/services/authentication.guard.js";


const routes = [
        {
            path: '',
            children: IAMRoutes
        },
        {
            path: '',
            component: Layout,
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: Dashboard
                },
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
router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    // Set the page title
    let baseTitle = 'KidyCare';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    // Call the authentication guard
    authenticationGuard(to, from, next);
});

export default router