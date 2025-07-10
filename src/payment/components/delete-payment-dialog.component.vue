<script >

  export default {
    name:"delete-payment-dialog",

  }
</script>

<template>
  <pv-dialog
      header="Are you sure?"
      :visible="true"
      :modal="true"
      :closable="false"
      :style="{
        width: '400px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        padding: '10px',
      }"
  >
    <div class="p-mb-3">
      Deleting this payment will keep the associated card number with your reservation.
      <br />
      Are you sure you want to proceed?
    </div>

    <template #footer>
      <pv-button
          label="Cancel"
          class="custom-button-secondary"
          @click="$emit('cancel')"
      />
      <pv-button
          label="Delete"
          class="custom-button-danger"
          autofocus
          @click="$emit('delete')"
      />
    </template>
  </pv-dialog>
</template>


<style scoped>
.p-mb-3 {
  margin-bottom: 1.5rem;
  color: #555;
}

.custom-button-secondary {
  background-color: #F2F2F2;
  color: #555;
  border-radius: 6px;
  padding: 10px 20px;
  font-weight: 600;
  margin-right: 10px;
}

.custom-button-secondary:hover {
  background-color: #e0e0e0;
}

.custom-button-danger {
  background-color: #F44336;
  color: white;
  border-radius: 6px;
  padding: 10px 20px;
  font-weight: 600;
}

.custom-button-danger:hover {
  background-color: #e53935;
}

.p-dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>