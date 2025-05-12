import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import i18n from "@/i18n.js";

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
    InputIcon,
    Menu,
    Menubar,
    Message,
    Stepper,
    Textarea,
    ToggleSwitch,
    Toolbar,
    Tooltip
} from 'primevue'


const app= createApp(App)

app
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
    .use(i18n)
    .mount('#app')
