<script >
  import  {PaymentApiService} from "./../services/payment-api.service.js";

  export default {
    name: 'card-list',
    data(){
      return{
        cards:[],
        userType: "babysitter",
        userId:3,
        paymentApiService: new PaymentApiService(),
      }
    },

    methods:{
      fetchCards() {
        this.paymentApiService
            .getCardsByUserId(this.userId, this.userType)
            .then(response => {
              this.cards = response;
            })
            .catch(error => {
              console.error("Error al obtener las tarjetas:", error);
            });
      },
    },

    created() {
      this.fetchCards();
    }
  }
</script>

<template>
  <div>
    <h2>Lista de Tarjetas</h2>
    <div v-if="cards.length > 0">
      <div v-for="card in cards" :key="card.id" class="card">
        <p><strong>Nombre del titular:</strong> {{ card.cardHolder }}</p>
        <p><strong>Número de tarjeta:</strong> {{ card.cardNumber }}</p>
        <p><strong>Fecha de expiración:</strong> {{ card.expirationDate }}</p>
        <p><strong>CVV:</strong> {{ card.cvv }}</p>
      </div>
    </div>
    <div v-else>
      <p>No se encontraron tarjetas para este usuario.</p>
    </div>
  </div>
</template>
<style scoped>

</style>