<script>
import PaymentCard from "@/payment/components/payment-card.component.vue";
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

    data(){
      return{
        cards:[],
        showCardDialog: false,
        selectedCard: null,
        showDeleteDialog: false,
        cardToDelete: null,
        currentPage: 1,
        itemsPerPage: 9,
        errorMessage: "",

      }
    },
    computed: {
      // Paginación de las tarjetas
      paginatedCards() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.cards.slice(start, start + this.itemsPerPage);
      },
      // Número total de páginas
      totalPages() {
        return Math.ceil(this.cards.length / this.itemsPerPage);
      },
    },
    mounted() {
      this.fetchCards();  // Llamar a la API cuando el componente se monta
    },

    methods: {
      async fetchCards() {
        try {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          const userId = user.id;
          const role = user.role;

          if (!userId || !role) {
            console.error("User is not logged in.");
            return;
          }
          const cardApiService = new CardApiService();


          // Solicitar todas las tarjetas y filtrar solo las que pertenecen al usuario logueado
          const response = await cardApiService.getCards();
          console.log("API response:", response.data);

          // Filtrar las tarjetas por `user_id` y asignarlas a `cards`
          if (role === "parent") {
            this.cards = response.data
                .filter(cardData => cardData.parent_id === userId)  // Filtrar por `parent_id`
                .map(cardData => new Card(cardData));  // Crear instancia de `Card`
          } else if (role === "babysitter") {
            this.cards = response.data
                .filter(cardData => cardData.babysitter_id === userId)  // Filtrar por `babysitter_id`
                .map(cardData => new Card(cardData));  // Crear instancia de `Card`
          }

          console.log("Filtered Cards:", this.cards);// Verifica que solo se muestren las tarjetas correctas
        } catch (error) {
          console.error("Error fetching cards:", error);
          this.errorMessage = "Error fetching cards";
        }
      },
      changePage(page) {
        this.currentPage = page;
      },
      addEditCard(card = null) {
        this.selectedCard = card;
        this.showCardDialog = true;
      },
      handleAdd(newCard) {
        this.cards.push(newCard);
      },
      handleUpdate(updatedCard) {
        const index = this.cards.findIndex(c => c.id === updatedCard.id);
        if (index !== -1) this.cards[index] = updatedCard;
      },
      closeDialog() {
        this.showCardDialog = false;
        this.selectedCard = null;
      },
      removeCard(card) {
        this.cardToDelete = card;
        this.showDeleteDialog = true;
      },
      async deleteCard() {
        try {
          console.log("Attempting to delete card with ID:", this.cardToDelete.id);
          const cardApiService = new CardApiService();
          await cardApiService.deleteCard(this.cardToDelete.id);
          this.cards = this.cards.filter(c => c.id !== this.cardToDelete.id);
          this.showDeleteDialog = false;
          this.cardToDelete = null;
          alert("Card removed successfully");
        } catch (error) {
          console.error("Error removing card:", error);
          alert("Error removing card");
        }
      },
      cancelDelete() {
        this.showDeleteDialog = false;
        this.cardToDelete = null;
      },
      goToHistory() {
        this.$router.push({ name: "paymentHistory" });
      },
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