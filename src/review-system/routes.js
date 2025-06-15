import ReviewList from "@/review-system/components/reviewList.vue";
export default [
    {
        path: '/reviews',
        component: () => import('@/review-system/pages/review.management.component.vue'),
    }
]
