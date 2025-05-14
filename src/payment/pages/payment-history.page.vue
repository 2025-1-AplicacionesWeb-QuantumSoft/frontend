<script>

  import {PaymentApiService} from "@/payment/services/payment-api.service.js";
  import {CardApiService} from "@/payment/services/card-api.service.js";
  import {onMounted, ref} from "vue";
  import {useRouter} from "vue-router";

  export default {
    name: "payment-history",

    setup() {
      const router = useRouter();
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const paymentListData = ref([]);

      const paymentApiService= new PaymentApiService()
      const cardApisService= new CardApiService()

      onMounted(async () => {
        const res = await paymentApiService.getPaymentByUserId(user.id);
        console.log("Datos recibidos:", res);
        const enriched = await Promise.all(res.map(async (payment) => {
          let cardNumber = 'N/A';
          if (payment.paymentMethod?.cardId) {
            try {
              const card = await cardApisService.getCardById(payment.paymentMethod.cardId);
              cardNumber = card.cardNumber;
            } catch (_) {
            }
          }
          return {
            ...payment,
            cardNumber: cardNumber,
          };
        }));

          paymentListData.value = enriched;

      });

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB");
      };

      return {
        user,
        paymentListData,
        formatDate,
        router,
      };
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
            ? slotProps.data.reservation?.babysitter_id?.name ?? 'N/A'
            : slotProps.data.reservation?.parent_id ?? 'N/A' }}
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
/* Fuente general y colores */
.space-y-4 {
  font-family: 'Open Sans', sans-serif;
  color: #222;
  padding: 2rem;
}

/* Título principal */
h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 1rem;
}

/* Botón "Go back" */
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

/* Tabla de pagos */
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
  background-color: white; /* Forza fondo blanco */
}

/* Elimina color de fila alterna */
::v-deep(.p-datatable .p-datatable-tbody > tr:nth-child(even)) {
  background-color: white;
}
</style>