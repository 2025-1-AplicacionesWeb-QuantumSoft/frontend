<script>

  export default {

    name:"payment-card",

    props:{
      card:{
        type:Object,
        required:true
      }
    },
    emits:["delete","edit"],
    methods:{
      handleDelete() {
        this.$emit('delete', this.card);
      },
      handleEdit() {
        this.$emit('edit', this.card);
      },
      formatExpiration(date) {
        if (!date) return '';
        const [year, month] = date.split('-');
        return `${month}/${year?.slice(2)}`;
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