import BabysitterSearch from "@/reservations/pages/BabysitterSearch.vue";
import BabysitterDetail from "@/reservations/pages/BabysitterDetail.vue";
import ReservationDetail from "@/reservations/pages/ReservationDetail.vue";
import ReservationsList from "@/reservations/pages/ReservationsList.vue";
export default [
    {
        path: 'babysitters',
        name: 'babysitter-search',
        component: () => import('@/reservations/pages/BabysitterSearch.vue'),
    },
    {
        path: 'babysitter/:id',
        name: 'babysitter-detail',
        component: () => import('@/reservations/pages/BabysitterDetail.vue'),
        props: true,
    },
    {
        path: 'reservation-detail',
        name: 'reservation-detail',
        component: () => import('@/reservations/pages/ReservationDetail.vue'),
    },
    {
        path: 'reservation-list/',
        name: 'reservations-list',
        component: () => import('@/reservations/pages/ReservationsList.vue'),
    },
]
