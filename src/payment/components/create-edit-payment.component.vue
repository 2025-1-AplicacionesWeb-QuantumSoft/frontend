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
      :header="editMode ? 'Edit Card' : 'Add New Card'"
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
  .p-field {
    margin-bottom: 1rem;
  }
  .p-grid {
    display: flex;
    gap: 1rem;
  }
</style>