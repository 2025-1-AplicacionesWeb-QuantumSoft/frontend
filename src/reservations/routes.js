import BabysitterSearch from "@/reservations/pages/BabysitterSearch.vue";
import BabysitterDetail from "@/reservations/pages/BabysitterDetail.vue";
import ReservationDetail from "@/reservations/pages/ReservationDetail.vue";
import ReservationsList from "@/reservations/pages/ReservationsList.vue";
export default [
    {
        path: 'babysitters',
        component: () => import('@/reservations/pages/BabysitterSearch.vue'),
    },
    {
        path: 'babysitter/:id',
        component: () => import('@/reservations/pages/BabysitterDetail.vue'),
        props: true,
    },
    {
        path: 'reservation-detail',
        component: () => import('@/reservations/pages/ReservationDetail.vue'),
    },
    {
        path: 'reservation-list/',
        component: () => import('@/reservations/pages/ReservationsList.vue'),
    }
]
