import BabysitterProfile from "@/registration-services/views/BabysitterProfile.vue";

export default [
    {
        path: "/babysitter-profile",
        component: () => import("@/registration-services/views/BabysitterProfile.vue"),
    }
]
