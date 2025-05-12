<script setup>
import PaymentHistory from "@/payment/pages/payment-history.page.vue";
</script>

<template>

  <main class="container">
  <router-view/>
    <payment-history></payment-history>
  </main>

</template>

<style scoped>
.container {
  background-color: var(--color-cream);
}
</style>
