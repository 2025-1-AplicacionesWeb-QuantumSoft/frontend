import BabysitterProfile from "@/registration-services/views/BabysitterProfile.vue";

export default [
    {
        path: "/babysitter-profile",
        name: "BabysitterProfile",
        component: () => import("@/registration-services/views/BabysitterProfile.vue"),
    }
]
