<script>
import PaymentCard from "@/payment/components/payment-card.component.vue";
import {onMounted, ref} from "vue";
import {CardApiService} from "@/payment/services/card-api.service.js";
import {useRouter} from "vue-router";
import CreateEditPayment from "@/payment/components/create-edit-payment.component.vue";
import DeletePaymentDialog from "@/payment/components/delete-payment-dialog.component.vue";
import {Card} from "@/payment/model/card.entity.js";


  export default {
    name: "payment-page",
    components: {
      PaymentCard,
      CreateEditPayment,
      DeletePaymentDialog,
    },
    setup(){
      const router = useRouter();
      const cards = ref([]);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const cardApiService = new CardApiService();
      const showCardDialog=ref(false);
      const selectedCard = ref(null);
      const showDeleteDialog = ref(false);
      const cardToDelete = ref(null);

      // Cargar las tarjetas al montar el componente
      onMounted(async () => {
        try {
          const response = await cardApiService.getCards(); // Obtén todas las tarjetas
          cards.value = response.data.map(cardData=> new Card(cardData));
          console.log(cards.value);
        } catch (error) {
          console.error("Error fetching cards:", error);
        }
      });

      const addEditCard = (card = null) => {
        selectedCard.value = card;
        showCardDialog.value = true;
      };

      const handleAdd = (newCard) => {
        cards.value.push(newCard);
      };

      const handleUpdate = (updatedCard) => {
        const index = cards.value.findIndex(c => c.id === updatedCard.id);
        if (index !== -1) cards.value[index] = updatedCard;
      };

      const closeDialog = () => {
        showCardDialog.value = false;
        selectedCard.value = null;
      };

      /*const addEditCard = (card = null) => {
        router.push({ name: "editCard", params: { cardId: card ? card.id : null } });
      };*/

      const removeCard =  (card) => {
        cardToDelete.value = card;
        showDeleteDialog.value = true;
      };

      const deleteCard = async () => {
        try {
          console.log("Attempting to delete card with ID:", cardToDelete.value?.id);
          await cardApiService.deleteCard(cardToDelete.value.id);
          cards.value = cards.value.filter(c => c.id !== cardToDelete.value.id);
          showDeleteDialog.value = false;
          cardToDelete.value = null;
          alert("Card removed successfully");

        } catch (error) {
          console.error("Error removing card:", error);
          alert("Error removing card");
        }
      };

      const cancelDelete = () => {
        showDeleteDialog.value = false;
        cardToDelete.value = null;
      };

      const goToHistory = () => {
        router.push({ name: "paymentHistory" });
      };

      return {
        cards,
        addEditCard,
        removeCard,
        goToHistory,
        showCardDialog,
        selectedCard,
        handleAdd,
        handleUpdate,
        closeDialog,
        showDeleteDialog,
        deleteCard,
        cancelDelete,
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
          label="Add Card"
          icon="pi pi-plus"
          class="p-button-primary"
          @click="addEditCard()"
      />
      <router-link to="/payment/history">
        <pv-button label="History" icon="pi pi-history" class="p-button-secondary" />
      </router-link>
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
    <create-edit-payment
        v-if="showCardDialog"
        :cardData="selectedCard"
        @add="handleAdd"
        @update="handleUpdate"
        @close="closeDialog"
    />

    <!-- Modal de Eliminar -->
    <delete-payment-dialog
        v-if="showDeleteDialog"
        @delete="deleteCard"
        @cancel="cancelDelete"
    />
  </div>
</template>

<style scoped>
.payment-methods-container {
  padding: 2rem;
}
.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>