<script>
import PaymentCard from "@/payment/components/payment-card.component.vue";
import {onMounted, ref} from "vue";
import {CardApiService} from "@/payment/services/card-api.service.js";
import {useRouter} from "vue-router";


  export default {
    name: "payment-page",
    components: {
      PaymentCard,
    },
    setup(){
      const router = useRouter();
      const cards = ref([]);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const cardApiService = new CardApiService();

      // Cargar las tarjetas al montar el componente
      onMounted(async () => {
        try {
          const response = await cardApiService.getPayments(); // Obtén todas las tarjetas
          cards.value = response.data;
        } catch (error) {
          console.error("Error fetching cards:", error);
        }
      });

      const addEditCard = (card = null) => {
        router.push({ name: "editCard", params: { cardId: card ? card.id : null } });
      };

      const removeCard = async (card) => {
        try {
          await cardApiService.deleteCard(card.id);
          cards.value = cards.value.filter((c) => c.id !== card.id);
          alert("Card removed successfully");
        } catch (error) {
          console.error("Error removing card:", error);
          alert("Error removing card");
        }
      };

      const goToHistory = () => {
        router.push({ name: "paymentHistory" });
      };

      return {
        cards,
        addEditCard,
        removeCard,
        goToHistory,
      };
    },
  }

</script>

<template>
  <div class="payment-methods-container">
    <h1>Your payment methods</h1>
    <p>
      In this section, you manage your payment wallet by registering your cards
      and setting up preferred payment methods for a seamless checkout experience.
    </p>

    <div class="action-buttons">
      <pv-button
          label="Add a card"
          icon="pi pi-plus"
          class="p-button-text"
          @click="addEditCard"
      />
      <pv-button
          label="History"
          icon="pi pi-history"
          class="p-button-text"
          @click="goToHistory"
      />
    </div>

    <div class="card-list">
      <payment-card
          v-for="card in cards"
          :key="card.id"
          :card="card"
          @onDelete="removeCard(card)"
          @onEdit="addEditCard(card)"
      />
    </div>
  </div>
</template>

<style scoped>

</style>