<script setup>
import PaymentHistory from "@/payment/pages/payment-history.page.vue";
import PaymentPage from "@/payment/pages/payment-page.page.vue";
</script>

<template>

  <main class="container">
    <router-view/>
    <payment-page></payment-page>
  </main>

</template>

<style scoped>
.container {
  background-color: var(--color-cream);
}
</style>
