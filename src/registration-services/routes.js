import BabysitterProfile from "@/registration-services/views/BabysitterProfile.vue";

export default [
    {
        path: "/babysitter-profile",
        name: "BabysitterProfile",
        component: () => import("@/registration-services/views/BabysitterProfile.vue"),
    },
    {
        path: "/parent-profile",
        name: "ParentProfile",
        component: () => import("@/registration-services/views/ParentProfile.vue"),
    }
    //{
        //path: "/profile",
        //name: "Profile",
        //component: () => import("@/registration-services/views/Profile.vue"),
    //}
]

