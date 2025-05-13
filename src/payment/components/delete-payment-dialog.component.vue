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
      :style="{ width: '400px' }"
  >
    <div class="p-mb-3">
      All your reservations made by you will keep the card number.
    </div>

    <template #footer>
      <pv-button
          label="Cancel"
          class="p-button-secondary"
          @click="$emit('cancel')"
      />
      <pv-button
          label="Delete"
          class="p-button-danger"
          autofocus
          @click="$emit('delete')"
      />
    </template>
  </pv-dialog>
</template>

<style scoped>
  .p-mb-3 {
    margin-bottom: 1rem;
  }
</style>