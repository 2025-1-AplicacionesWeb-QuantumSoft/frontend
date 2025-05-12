<script setup>

import CardList from "@/payment/components/card-list.component.vue";
import PaymentHistoryWatch from "@/payment/watchs/payment-history.watch.vue";
import PaymentHistory from "@/payment/watchs/payment-history.watch.vue";
</script>

<template>

  <main class="container">
  <router-view/>
  <header>

  </header>
  </main>

</template>

<style scoped>
.container {
  background-color: var(--color-cream);
}
</style>
