import BabysitterSearch from "@/reservations/pages/BabysitterSearch.vue";
import BabysitterDetail from "@/reservations/pages/BabysitterDetail.vue";
import ReservationDetail from "@/reservations/pages/ReservationDetail.vue";
import ReservationsList from "@/reservations/pages/ReservationsList.vue";
export default [
    {
        path: '/babysitters',
        name: 'babysitter-search',
        component: BabysitterSearch,
    },
    {
        path: '/babysitter/:id',
        name: 'BabysitterDetail',
        component: BabysitterDetail,
    },
    {
        path: '/reservation-detail',
        name: 'ReservationDetail',
        component: ReservationDetail,
    },
    {
        path: '/reservation-list/',
        name: 'ReservationList',
        component: ReservationsList,
    }
]
