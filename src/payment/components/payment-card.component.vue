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
      <div class="card-stripe mb-3"></div>
      <div class="payment-card-content">
        <p class="field"><strong>Num:</strong> {{ card.cardNumber }}</p>
        <p class="field"><strong>F.V.:</strong> {{ formatExpiration(card.expirationDate) }}</p>
        <p class="card-holder">{{ card.cardHolder }}</p>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2 mt-2">
        <pv-button label="Delete" severity="danger" @click="handleDelete" />
        <pv-button label="Edit" severity="primary" @click="handleEdit" />
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.payment-card {
  background-color: #92d2dc; /* Celeste claro */
  border-radius: 12px;
  padding: 1rem;
  color: #001b5e; /* Azul oscuro */
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card-stripe {
  height: 20px;
  background-color: #001b5e;
  border-radius: 4px;
}

.payment-card-content .field {
  margin: 0.5rem 0;
  color: #001b5e;
  font-size: 1rem;
}

.card-holder {
  margin-top: 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
  color: #001b5e;
}
</style>