import './assets/main.css'
import pinia from "./pinia.js";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {
    AutoComplete,
    Button,
    Card,
    CascadeSelect,
    Checkbox, Column,
    ConfirmDialog,
    DataTable,
    DatePicker,
    Dialog,
    FileUpload,
    FloatLabel,
    IconField,
    Image,
    InputIcon, InputText,
    Menu,
    Menubar,
    Message,
    Stepper,
    Textarea,
    ToggleSwitch,
    Toolbar,
    Tooltip
} from 'primevue'
import i18n from "@/i18n.js";
import PrimeVue from 'primevue/config'

import '@primevue/themes'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Aura from '@primeuix/themes/aura';
import ReviewItem from "@/review-system/components/reviewItem.vue";

const app= createApp(App)

app
    .use(pinia)
    .use(router)
    .component("pv-menu",Menu)
    .component("pv-menubar",Menubar)
    .component("pv-upload",FileUpload)
    .component("pv-tooltip",Tooltip)
    .component("pv-toolbar",Toolbar)
    .component("pv-stepper",Stepper)
    .component("pv-confirmDialog",ConfirmDialog)
    .component("pv-card",Card)
    .component("pv-autoComplete",AutoComplete)
    .component("pv-cascadeSelect",CascadeSelect)
    .component("pv-checkbox",Checkbox)
    .component("pv-datePicker",DatePicker)
    .component("pv-floatLabel",FloatLabel)
    .component("pv-iconField",IconField)
    .component("pv-textarea",Textarea)
    .component("pv-toggleSwitch",ToggleSwitch)
    .component("pv-button",Button)
    .component("pv-dataTable",DataTable)
    .component("pv-message",Message)
    .component("pv-inputIcon",InputIcon)
    .component("pv-image",Image)
    .component("pv-dialog",Dialog)
    .component("pv-column",Column)
    .component("pv-inputText",InputText)
    .component("pv-reviewItem",ReviewItem)
    .use(i18n)
    .use(PrimeVue, {
        // Default theme configuration
        theme: {
            present: Aura,
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
