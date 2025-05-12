<script>

  import {PaymentApiService} from "@/payment/services/payment-api.service.js";
  import {onMounted} from "vue";

  export default {
    name: "payment-history",

    setup() {
      const router = useRouter();
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const paymentListData = ref([]);

      const paymentApiService= new PaymentApiService()

      onMounted(async () => {
        const res = await paymentApiService.getPaymentByUserId(user.id);
        paymentListData.value = res;
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
          {{ formatDate(slotProps.data.createdAt) }}
        </template>
      </pv-column>

      <pv-column header="Amount">
        <template #body="slotProps">
          S/ {{ slotProps.data.reservation.totalAmount.toFixed(2) }}
        </template>
      </pv-column>

      <pv-column :header="user.role === 'tutor' ? `Caregiver's name` : `Tutor's name`">
        <template #body="slotProps">
          {{ user.role === 'tutor'
            ? slotProps.data.reservation.caregiver?.completeName?.completeName
            : slotProps.data.reservation.tutorId }}
        </template>
      </pv-column>

      <pv-column header="Card number">
        <template #body="slotProps">
          {{ slotProps.data.card?.cardNumber }}
        </template>
      </pv-column>
    </pv-dataTable>
  </div>
</template>

<style scoped>

</style>