import ChatSystem from "@/communication-system/pages/chat-system.vue";
export default [
    {
        path: "/chat",
        component: () => import("@/communication-system/pages/chat-system.vue"),
    },
]