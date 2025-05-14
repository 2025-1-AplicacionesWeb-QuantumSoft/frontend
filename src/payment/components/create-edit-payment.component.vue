<script>
  import {CardApiService} from "@/payment/services/card-api.service.js";
  import {Button as PvButton} from "primevue";


  export default {
    name: "create-edit-payment",
    components: {PvButton},

    props:{
      cardData:{
        type:Object,
        default:null
      },
    },
    data(){
      return{
        user: JSON.parse(window.localStorage.getItem("user") || "{}"),
        cardForm: {
          cardNumber: "",
          cardHolder: "",
          cvv: "",
          expirationDate: "",
        },
        formattedExpirationDate: "",
      }
    },
    computed:{
      editMode(){
        return !!this.cardData;
      }
    },

    watch:{
      cardData: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.cardForm = {
              cardNumber: newVal.cardNumber || "",
              cardHolder: newVal.cardHolder || "",
              cvv: newVal.cvv || "",
              expirationDate: newVal.expirationDate || "",
            };
          }
        },
      },
    },
    methods:{

      onCancel() {
        this.$emit("close");
      },

      async onSubmit() {
        const cardApiService = new CardApiService();

        const card = {
          parentId: this.user.id,
          ...this.cardForm,
        };

        try {
          if (this.editMode) {
            await cardApiService.updateCard(this.cardData.id, card);
            this.$emit("update", { ...card, id: this.cardData.id });
          } else {
            const createCard = await cardApiService.createCard(card);
            this.$emit("add", createCard);
          }
        } catch (e) {
          console.error("Error saving card:", e);
        }

        this.onCancel();
      },
    },
  }
</script>

<template>
  <pv-dialog
      :visible="true"
      :modal="true"
      :closable="true"
      :style="{ width: '400px' }"
      @hide="onCancel"
  >
    <form @submit.prevent="onSubmit">
      <div class="p-field">
        <label for="cardNumber">Card Number</label>
        <pv-inputText id="cardNumber" v-model="cardForm.cardNumber" required />
      </div>

      <div class="p-field">
        <label for="cardHolder">Card Holder</label>
        <pv-inputText id="cardHolder" v-model="cardForm.cardHolder" required />
      </div>

      <div class="p-grid">
        <div class="p-col">
          <label for="expirationDate">Exp. Date (MM/YY)</label>
          <pv-inputText id="expirationDate" v-model="cardForm.expirationDate" required />
        </div>
        <div class="p-col">
          <label for="cvv">CVV</label>
          <pv-inputText id="cvv" v-model="cardForm.cvv" required />
        </div>
      </div>

      <div class="dialog-footer">
        <pv-button label="Cancel" class="p-button-secondary" @click="onCancel" />
        <pv-button label="Save" class="p-button-primary" type="submit" />
      </div>
    </form>
  </pv-dialog>
</template>

<style scoped>

form {
  background-color: #f4cbb2;
  padding: 2rem;
  border-radius: 12px;
  font-family: 'Segoe UI', sans-serif;
}

.p-inputtext {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #444;
  background-color: white;
  color: #333;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
  color: #000;
}

.p-field {
  margin-bottom: 1.5rem;
}

.p-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.p-col {
  flex: 1;
  min-width: 120px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1rem;
}

.p-button-primary {
  background-color: #000 !important;
  border: none !important;
  color: #fff !important;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.p-button-secondary {
  background-color: transparent !important;
  border: 1px solid #000 !important;
  color: #000 !important;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.p-button .pi {
  font-size: 1.2rem;
}
</style>