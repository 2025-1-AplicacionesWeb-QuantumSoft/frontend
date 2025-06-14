<script>
import { ref } from 'vue';
import { ReviewApiService } from '@/review-system/service/review.service.js';

export default {
  name: 'review-item',
  props: {
    profile: { type: Object, required: true }
  },
  emits: ['review-updated'],
  setup(props, { emit }) {
    const isEditing = ref(false);
    const editableReview = ref({ ...props.profile });
    const reviewService = new ReviewApiService();

    function onEditReview() {
      isEditing.value = true;
    }

    async function onSaveReview() {
      try {
        await reviewService.updateReview(editableReview.value);
        isEditing.value = false;
        emit('review-updated');
      } catch (error) {
        console.error('Error al actualizar la reseña:', error);
      }
    }

    function onCancelEdit() {
      editableReview.value = { ...props.profile };
      isEditing.value = false;
    }

    return { isEditing, editableReview, onEditReview, onSaveReview, onCancelEdit };
  }
}
</script>

<template>
  <pv-card class="review-card">
    <template #header>
      <h3>Review</h3>
    </template>
    <template #content>
      <form class="form-grid" @submit.prevent="onSaveReview">
        <label>ID de reseña</label>
        <input type="text" v-model="editableReview.id" disabled />

        <label>ID del padre</label>
        <input type="text" v-model="editableReview.parentId" :disabled="!isEditing" />

        <label>ID de niñera</label>
        <input type="text" v-model="editableReview.babysitterId" :disabled="!isEditing" />

        <label>Comentario</label>
        <textarea v-model="editableReview.comment" :disabled="!isEditing"></textarea>

        <label>Calificación</label>
        <input type="number" v-model="editableReview.rating" :disabled="!isEditing" />

        <label>Fecha</label>
        <input type="text" v-model="editableReview.date" :disabled="!isEditing" />
      </form>
      <div>
        <button v-if="!isEditing" class="edit-button" @click="onEditReview">Editar reseña</button>
        <div v-else>
          <button class="edit-button" @click="onSaveReview">Guardar</button>
          <button class="edit-button" @click="onCancelEdit" type="button">Cancelar</button>
        </div>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.review-card {
  background-color: var(--color-primary);
  border-radius: 1rem;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 1.5rem;
  margin: 1rem 0;
}
.form-grid label {
  color: #fff;
  font-weight: bold;
  margin-top: 1rem;
  display: block;
}
.form-grid input,
.form-grid textarea {
  width: 100%;
  border-radius: 0.5rem;
  border: none;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #222;
  color: #fff;
  resize: none;
}
.form-grid input[disabled],
.form-grid textarea[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}
.edit-button {
  margin-top: 1rem;
  background: #ffd700;
  color: #222;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-right: 0.5rem;
}
.edit-button:hover {
  background: #ffe066;
}
</style>