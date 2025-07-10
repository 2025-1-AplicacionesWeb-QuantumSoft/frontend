<script>
  import {CardApiService} from "@/payment/services/card-api.service.js";
  import {Button as PvButton} from "primevue";
  import {useAuthenticationStore} from "@/iam/services/authentication.store.js";
  import {ParentService} from "@/registration-services/service/registration.service.js";
  import {BabysitterService} from "@/reservations/service/reservation.service.js";


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
        cardForm: {
          cardNumber: "",
          cardHolder: "",
          cvv: "",
          expirationDate: "",
        }
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
              expirationDate: `${newVal.expirationDate.month.toString().padStart(2, '0')}/${newVal.expirationDate.year.toString().slice(-2)}`
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
        const authStore = useAuthenticationStore();
        const role = authStore.role;
        const userId = authStore.userId;
        let roleId = null;


        try {

          if (role === "parent") {
            const parent = await ParentService.getParentByUserId(userId);
            roleId = parent?.id;
          } else if (role === "babysitter") {
            const babysitter = await BabysitterService.getBabysitterByUserId(userId);
            roleId = babysitter?.id;
          }

          if (!roleId) {
            console.error("No se pudo obtener el id del rol correspondiente");
            return;
          }

          const [monthStr, yearStr] = this.cardForm.expirationDate.split('/');
          const month = parseInt(monthStr);
          const year = parseInt(yearStr);

          // construimos data para enviar
          const cardPayload = {
            parentId: role === "parent" ? roleId : 0,
            babysitterId: role === "babysitter" ? roleId : 0,
            numberCard: this.cardForm.cardNumber,
            cardHolder: this.cardForm.cardHolder,
            code: parseInt(this.cardForm.cvv),
            month,
            year
          };

          console.log("JSON ENVIADO:", JSON.stringify(cardPayload, null, 2));

          const cardApiService = new CardApiService();

          if (this.editMode) {
            await cardApiService.updateCard(this.cardData.id, cardPayload);
            this.$emit("update", { ...cardPayload, id: this.cardData.id });
          } else {
            const createdCard = await cardApiService.createCard(cardPayload);
            this.$emit("add", createdCard);
          }
          this.onCancel();
        } catch (e) {
          console.error("Error saving card:", e);
        }
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