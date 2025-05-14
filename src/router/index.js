import { createRouter, createWebHistory } from 'vue-router'
import reservationRoutes from '@/reservations/routes.js'
import Chat from '@/communication-system/pages/chat-system.vue'
import Layout from '@/shared/Layout.component.vue'


const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            //...reservationRoutes,
            //demas rutas de bounded context
            //se pone por cada bounded context
            { path: 'chat', component: Chat },

        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
