<script>

  export default {
    name: "create-edit-payment",

    props:{
      cardData:{
        type:Object,
        default:null
      }
    },
    data(){
      return{
        editMode: !!this.cardData,
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
    watch:{
      cardData: {
        immediate: true,
        handler(newData) {
          if (this.editMode) {
            this.cardForm.cardNumber = newData.cardNumber;
            this.cardForm.cardHolder = newData.cardHolder;
            this.cardForm.cvv = newData.cvv;
            this.cardForm.expirationDate = newData.expirationDate;

            // Use the formatted expiration date for display
            this.formattedExpirationDate = this.getFormattedExpirationDate(newData.expirationDate);
          }
        },
      },
    },
    methods:{
      getFormattedExpirationDate(expirationDate) {
        return new Date(expirationDate).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        });
      },

      onCancel() {
        this.$emit("close");
      },

      onSubmit() {
        const {cardNumber, cardHolder, cvv} = this.cardForm;
        const expirationDate = this.formattedExpirationDate;
        const month = expirationDate.split("/")[0];
        const year = expirationDate.split("/")[1];

        const card = {
          parentId: this.user.id,
          cardNumber,
          cardHolder,
          cvv,
          expirationDate: `${month}/${year}`,
        };
        if (this.editMode) {
          CardApi.updateCard(this.cardData.id, card).then(() => {
            this.$emit("update", card);
          });
        } else {
          CardApi.createCard(card).then(() => {
            this.$emit("add", card);
          });
        }
        this.onCancel();
      }
    }

  }
</script>

<template>
  <pv-dialog
      :header="editMode ? 'Update your card' : 'Add a new card'"
      :visible="true"
      :modal="true"
      :closable="true"
      :style="{ width: '400px' }"
      @hide="onCancel">
    <form @submit.prevent="onSubmit">
      <div class="p-field">
        <label for="cardNumber">Card number</label>
        <InputText
            id="cardNumber"
            v-model="cardForm.cardNumber"
            required
        />
      </div>
      <div class="p-field">
        <label for="cardHolder">Card holder</label>
        <InputText
            id="cardHolder"
            v-model="cardForm.cardHolder"
            required
        />
      </div>
      <div class="p-grid">
        <div class="p-col">
          <div class="p-field">
            <label for="expirationDate">Exp. Date</label>
            <InputText
                id="expirationDate"
                v-model="formattedExpirationDate"
                required
            />
          </div>
        </div>
        <div class="p-col">
          <div class="p-field">
            <label for="cvv">CVV</label>
            <InputText
                id="cvv"
                v-model="cardForm.cvv"
                required
            />
          </div>
        </div>
      </div>
      <p-footer>
        <pv-button
            label="Cancel"
            class="p-button-secondary"
            @click="onCancel"
        />
        <pv-button
            label="Save"
            class="p-button-primary"
            type="submit"
        />
      </p-footer>
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