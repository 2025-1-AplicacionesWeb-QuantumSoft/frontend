<script>
import { PaymentApiService } from "@/payment/services/payment-api.service.js";
import { useAuthenticationStore } from "@/iam/services/authentication.store.js";
import { ParentService } from "@/registration-services/service/registration.service.js";
import { BabysitterService } from "@/reservations/service/reservation.service.js";
import { Payment } from "@/payment/model/payment.entity.js";

export default {
  name: "payment-history",

  data() {
    return {
      paymentListData: [],
      parentData: null,
      babysitterData: null,
      userRole: "",
      errorMessage: ""
    };
  },

  methods: {
    async fetchPayments() {
      try {
        const authStore = useAuthenticationStore();
        const userId = authStore.userId;
        const role = authStore.role;
        this.userRole = role;

        if (!userId || !role) {
          this.errorMessage = "Sesión no encontrada. Por favor inicie sesión.";
          this.$router.push({ name: "login" });
          return;
        }

        const paymentApiService = new PaymentApiService();
        let roleId = null;

        if (role === "parent") {
          const parentResponse = await ParentService.getParentByUserId(userId);
          if (parentResponse && parentResponse.id) {
            this.parentData = parentResponse;
            roleId = parentResponse.id;

            const paymentsResponse = await paymentApiService.getPaymentByParentId(roleId);

            paymentsResponse.forEach(payment => {
              console.log("Pago con tarjeta:", payment.cardNumber);
            });

            this.paymentListData = paymentsResponse.map(paymentData => new Payment(paymentData));
            console.log("Payment con relatedUser:", this.paymentListData);
          } else {
            this.errorMessage = "No se pudo obtener la información del parent.";
            console.error("Parent no encontrado.");
          }
        }
      } catch (error) {
        console.error("Error al obtener los pagos:", error);
        this.errorMessage = "Error al obtener los pagos.";
      }
    },

    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB");
    }
  },

  mounted() {
    this.fetchPayments();
  }
};
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


    <p v-if="paymentListData.length === 0">No se encontraron pagos para este parent.</p>

    <pv-dataTable v-if="paymentListData.length" :value="paymentListData" responsiveLayout="scroll">
      <pv-column field="id" header="No."></pv-column>

      <pv-column header="Created at">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.createdAtDate) }}
        </template>
      </pv-column>

      <pv-column header="Amount">
        <template #body="slotProps">
          S/ {{ (slotProps.data.amount ?? 0).toFixed(2) }}
        </template>
      </pv-column>

      <pv-column :header="userRole === 'parent' ? `Babysitter's name` : `Parent's name`">
        <template #body="slotProps">
          {{ userRole === 'parent'
            ? (slotProps.data.relatedUser ?? 'N/A')
            : (slotProps.data.reservation?.name ?? 'N/A') }}
        </template>
      </pv-column>

      <!-- Columna para el número de la tarjeta -->
      <pv-column header="Card number">
        <template #body="slotProps">
          {{ slotProps.data.cardNumber ?? 'N/A' }}
        </template>
      </pv-column>
    </pv-dataTable>

    <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
  </div>
</template>




<style scoped>
/* Importar la fuente Open Sans */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
  color: #222 !important;
  background-color: #fff;
  margin-top: 2rem;
  width: 100%;
  overflow-x: auto; /* Permite desplazamiento horizontal en pantallas pequeñas */
}

::v-deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #4F8EF7;
  color: white;
  font-weight: 600;
  text-align: center;
  padding: 1rem;
  font-size: 1rem;
  text-transform: uppercase;
  min-width: 150px; /* Ajusta el tamaño mínimo de las columnas */
}

::v-deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 1rem;
  text-align: center;  /* Alineación centrada */
  font-size: 0.95rem;
  word-wrap: break-word; /* Asegura que el texto largo se rompa correctamente */
}

::v-deep(.p-datatable .p-datatable-tbody > tr:nth-child(even)) {
  background-color: #f7f7f7; /* Fila alterna de color suave */
}

::v-deep(.p-datatable .p-datatable-tbody > tr:nth-child(odd)) {
  background-color: #ffffff;
}

::v-deep(.p-datatable .p-datatable-tfoot > tr > td) {
  background-color: #4F8EF7;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  padding: 1rem;
  text-align: center;
}

.text-red-500 {
  color: #f44336; /* Rojo para mensajes de error */
}

.p-button-text {
  font-weight: 600;
  transition: all 0.3s ease;
}

.p-button-text:hover {
  background-color: #3c76d3;
}

.p-datatable {
  margin-top: 2rem;
}

/* Responsividad para pantallas pequeñas */
@media (max-width: 768px) {
  .space-y-4 {
    padding: 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .p-datatable {
    font-size: 0.875rem;
  }

  .p-datatable .p-datatable-thead > tr > th,
  .p-datatable .p-datatable-tbody > tr > td {
    font-size: 0.85rem;
  }
}
</style>
