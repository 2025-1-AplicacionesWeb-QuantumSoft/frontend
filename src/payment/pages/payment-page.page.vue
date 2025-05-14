<script>
import PaymentCard from "@/payment/components/payment-card.component.vue";
import {computed, onMounted, ref} from "vue";
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
      const currentPage = ref(1);
      const itemsPerPage = 9;

      onMounted(async () => {
        try {
          const response = await cardApiService.getCards();
          console.log("API response:", response.data);
          cards.value = response.data.map(cardData=> new Card(cardData));
          console.log(cards.value);
        } catch (error) {
          console.error("Error fetching cards:", error);
        }
      });

      const paginatedCards = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        return cards.value.slice(start, start + itemsPerPage);
      });

      const totalPages = computed(() => {
        return Math.ceil(cards.value.length / itemsPerPage);
      });

      const changePage = (page) => {
        currentPage.value = page;
      };

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
        paginatedCards,
        totalPages,
        changePage,
        currentPage,
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
          class="custom-button"
          style="background-color: #F582AE; color: black; border-radius: 6px; margin-right: 1rem; padding: 10px;"
          @click="addEditCard()"
      />
      <router-link to="/payment/history">
        <pv-button label="History" icon="pi pi-history" class="custom-button secondary" style="background-color: #F582AE88; color: black; border-radius: 6px; padding: 10px"/>
      </router-link>
    </div>

    <div class="card-list">
      <payment-card
          v-for="card in paginatedCards"
          :key="card.id"
          :card="card"
          @onDelete="removeCard(card)"
          @onEdit="addEditCard(card)"
      />
    </div>

    <div class="pagination" v-if="totalPages > 1">
      <button
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
          @click="changePage(page)"
      >
        {{ page }}
      </button>
    </div>


    <create-edit-payment
        v-if="showCardDialog"
        :cardData="selectedCard"
        @add="handleAdd"
        @update="handleUpdate"
        @close="closeDialog"
    />

    <delete-payment-dialog
        v-if="showDeleteDialog"
        @delete="deleteCard"
        @cancel="cancelDelete"
    />
  </div>
</template>

<style scoped>
.pagination {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}
.pagination button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #F582AE;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button.active {
  background-color: #c95d85;
}
.payment-methods-container {
  font-family: "Open Sans", sans-serif;
  color: #000000;
  padding: 2rem;
}

.payment-methods-container h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 1rem;
}

.payment-methods-container p {
  font-size: 1rem;
  font-weight: 400;
  color: #444;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
payment-card {
  width: 100%;
}
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

.custom-button {
  background-color: #F582AE !important;
  border: none !important;
  color: white !important;
}

.custom-button.secondary {
  background-color: #F582AE88 !important;
  color: #000 !important;
}
</style>