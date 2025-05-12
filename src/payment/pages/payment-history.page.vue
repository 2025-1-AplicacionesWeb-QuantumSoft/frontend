<script>

  import {PaymentApiService} from "@/payment/services/payment-api.service.js";
  import {onMounted, ref} from "vue";
  import {useRouter} from "vue-router";

  export default {
    name: "payment-history",

    setup() {
      const router = useRouter();
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const paymentListData = ref([]);

      const paymentApiService= new PaymentApiService()

      onMounted(async () => {
        const res = await paymentApiService.getPaymentByUserId(user.id);
        console.log("Datos recibidos:", res);
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
          {{ slotProps.data.paymentMethod?.cardId ?? 'N/A' }}
        </template>
      </pv-column>
    </pv-dataTable>
  </div>
</template>

<style scoped>

</style>