<script>

  export default {

    name:"payment-card",

    props:{
      card:{
        type:Object,
        required:true
      }
    },
    emits:["onDelete","onEdit"],
    methods:{
      handleDelete() {
        this.$emit('onDelete', this.card);
      },
      handleEdit() {
        this.$emit('onEdit', this.card);
      },
      formatExpiration(date) {
        const regex = /^\d{2}\/\d{2}$/; // MM/YY
        return regex.test(date) ? date : '';
      },
    },

  }

</script>

<template>
  <pv-card class="payment-card">
    <template #content>
      <div class="payment-card-content">
        <p>Num: {{ card.cardNumber }}</p>
        <p>Exp. Date: {{ formatExpiration(card.expirationDate) }}</p>
        <p style="text-transform: uppercase">{{ card.cardHolder }}</p>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <pv-button label="Delete" severity="danger" @click="handleDelete" />
        <pv-button label="Edit" severity="primary" @click="handleEdit" />
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
  .payment-card {
    border: 1px solid  #dcdcdc;
    border-radius: 1rem;
    padding: 1rem;
  }
  .payment-card-content p {
    margin: 0.25rem 0;
  }
</style>