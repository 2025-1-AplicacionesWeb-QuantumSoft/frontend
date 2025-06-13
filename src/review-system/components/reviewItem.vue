<script>
import { Review } from '../model/review.entity.js'

export default {
  name: 'review-item',
  props: {
    profile: { type: Review, required: true }
  },
  methods: {
    onEditReview() {
      console.log("Actualizar reseña:", this.profile)
    }
  }
}
</script>

<template>
  <pv-card class="review-card">
    <template #header>
      <h3>Review</h3>
    </template>
    <template #content>
      <form class="form-grid">
        <label>ID de reseña</label>
        <input type="text" :value="profile.id" disabled />

        <label>ID del padre</label>
        <input type="text" :value="profile.parentId" disabled />

        <label>ID de niñera</label>
        <input type="text" :value="profile.babysitterId" disabled />

        <label>Comentario</label>
        <textarea :value="profile.comment" disabled></textarea>

        <label>Calificación</label>
        <input type="number" :value="profile.rating" disabled />

        <label>Fecha</label>
        <input type="text" :value="profile.date" disabled />
      </form>
      <button class="edit-button" @click="onEditReview">Editar reseña</button>
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
}
.edit-button:hover {
  background: #ffe066;
}
</style>