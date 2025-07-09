export default [
    {
        path: 'sign-in',
        name: 'sign-in',
        component: () => import('@/iam/pages/sign-in.component.vue'),
    },
    {
        path: 'sign-up',
        name: 'sign-up',
        component: () => import('@/iam/pages/sign-up.component.vue'),
    }
]