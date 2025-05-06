import './assets/main.css'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import '@primevue/themes'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Lara from '@primevue/themes/lara';

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
    .use(PrimeVue, {
        // Default theme configuration
        theme: {
            preset: Aura,
            options: {
                prefix: 'p',
                darkModeSelector: 'system',
                cssLayer: {
                    name: 'primevue',
                    order: ' app-styles, primevue, tailwindcss '
                }
            }
        }
    })
    .mount('#app')
