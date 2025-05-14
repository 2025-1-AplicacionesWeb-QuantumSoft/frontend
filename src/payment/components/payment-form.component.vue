<script >
  import {Card} from "./../model/card.entity.js"

  export default {
    name:"payment-form",


    emits:["addCard"],
    data(){
      return {
        newCard: new Card({
          parent_id: 1,
          cardNumber: "",
          cardHolder: "",
          expirationDate: "",
          cvv: "",
        }),
      };
    },
    methods: {
      onSubmit() {
        if (
            this.newCard.cardHolder &&
            this.newCard.cardNumber &&
            this.newCard.expirationDate &&
            this.newCard.cvv
        ) {
          this.$emit("addCard", this.newCard);
          this.newCard = new Card({ parent_id: 1 }); // reset con id predefinido
        }
      },
    }
  }
</script>

<template>
  <pv-card>
    <template #title>Add New Card</template>
    <template #content>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div class="p-fluid">
          <label for="cardHolder">Cardholder Name</label>
          <pv-inputText id="cardHolder" v-model="newCard.cardHolder" required />

          <label for="cardNumber" class="mt-3">Card Number</label>
          <pv-inputText id="cardNumber" v-model="newCard.cardNumber" required />

          <div class="grid mt-3">
            <div class="col-6">
              <label for="expirationDate">Expiration Date (MM/YY)</label>
              <pv-inputText
                  id="expirationDate"
                  v-model="newCard.expirationDate"
                  required
              />
            </div>

            <div class="col-6">
              <label for="cvv">CVV</label>
              <pv-inputText
                  id="cvv"
                  v-model="newCard.cvv"
                  type="password"
                  required
              />
            </div>
          </div>

          <pv-button label="Submit Payment" type="submit" class="mt-4 w-full" />
        </div>
      </form>
    </template>
  </pv-card>
</template>

<style scoped>
  .p-fluid > * {
    width: 100%;
  }
</style>