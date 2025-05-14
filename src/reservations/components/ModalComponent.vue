<script setup>
defineProps({
  visible: Boolean
})

const emit = defineEmits(['close'])

const emitClose = () => emit('close')
</script>

<template>
  <div
      v-if="visible"
      class="modal-overlay"
      @click.self="emitClose"
  >
    <div class="modal-container">
      <button class="modal-close-button" @click="emitClose">
        <i class="pi pi-times"></i>
      </button>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  position: relative;
  animation: fadeIn 0.3s ease-out;
}

.modal-close-button {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #555;
  cursor: pointer;
  transition: color 0.2s;
}

.modal-close-button:hover {
  color: #000;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

</style>