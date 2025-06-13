<script>

  import {PaymentApiService} from "@/payment/services/payment-api.service.js";
  import {CardApiService} from "@/payment/services/card-api.service.js";

  export default {
    name: "payment-history",

    data(){
      return{
        user: JSON.parse(localStorage.getItem("user") || "{}"),
        paymentListData:[],
        errorMessage:""
      }
    },

    methods:{
      async fetchPayments() {
        const user = this.user;
        if (!this.user.id) {
          this.errorMessage = "Usuario no logeado.";
          return;
        }

        try {
          const paymentApiService = new PaymentApiService();
          const payments = await paymentApiService.getPaymentByUserId(user.role, user.id);

          if (payments.length === 0) {
            console.log("No se encontraron pagos para este usuario.");
            this.errorMessage = "No tienes historial de pagos.";
            return;
          }

          this.paymentListData = payments;

        } catch (error) {
          console.error("Error al obtener los pagos:", error);
          this.errorMessage = "Error al obtener los pagos";
        }
      },

        formatDate(dateString) {
          if (!dateString) return '';
          const date = new Date(dateString);
          return date.toLocaleDateString("en-GB");
        }
    },

    mounted() {
      this.fetchPayments();
    },

  }
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">Your payment history</h1>

    <pv-button
        label="Go back"
        icon="pi pi-arrow-left"
        class="p-button-text"
        @click="$router.back()"
    />

    <pv-dataTable :value="paymentListData" responsiveLayout="scroll">
      <pv-column field="id" header="No."></pv-column>

      <pv-column header="Created at">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.created_at) }}
        </template>
      </pv-column>

      <pv-column header="Amount">
        <template #body="slotProps">
          S/ {{ slotProps.data.amount?.toFixed(2) ?? '0.00' }}
        </template>
      </pv-column>

      <pv-column :header="user.role === 'parent' ? `Babysitter's name` : `Parent's name`">
        <template #body="slotProps">
          {{ user.role === 'parent'
            ? slotProps.data.relatedUser?.name ?? 'N/A'
            : slotProps.data.reservation?.name ?? 'N/A' }}
        </template>
      </pv-column>

      <pv-column header="Card number">
        <template #body="slotProps">
          {{ slotProps.data.cardNumber }}
        </template>
      </pv-column>
    </pv-dataTable>
  </div>
</template>

<style scoped>
.space-y-4 {
  font-family: 'Open Sans', sans-serif;
  color: #222;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 1rem;
}

::v-deep(.p-button-text) {
  background-color: #4F8EF7 !important;
  color: white !important;
  border: none !important;
  border-radius: 6px;
  padding: 0.5rem 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  transition: background-color 0.3s ease;
}

::v-deep(.p-button-text:hover) {
  background-color: #3c76d3 !important;
}

::v-deep(.p-datatable) {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0,0,0,0.08);
  color: #222 !important;
  background-color: #fff;
}

::v-deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #4F8EF7;
  color: white;
  font-weight: 600;
  text-align: left;
  padding: 0.75rem 1rem;
}

::v-deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  font-size: 0.95rem;
  color: #222;
  background-color: white;
}

::v-deep(.p-datatable .p-datatable-tbody > tr:nth-child(even)) {
  background-color: white;
}
</style>