<script>
import { Babysitter } from "../model/babysitter.entity.js";

export default {
  name: "babysitter-card",
  props: {
    profile: { type: Babysitter, required: true }
  },
  methods: {
    onEditProfile() {

      console.log("Actualizar perfil:", this.profile);
    }
  }
}
</script>

<template>
  <pv-card>
    <template #header>
      <h3>Your Profile</h3>
    </template>

    <template #content>
      <section class="bio-section">
        <h4>Biography</h4>
        <p>{{ profile.description }}</p>
      </section>

      <form class="form-grid">
        <input type="text" v-model="profile.name" placeholder="Name" />
        <input type="email" v-model="profile.email" placeholder="Email" />
        <input type="text" v-model="profile.phone" placeholder="Phone" />
        <input type="text" v-model="profile.location" placeholder="Location" />
        <input type="text" v-model="profile.experience" placeholder="Experience" />
      </form>

      <p><strong>Average Rating:</strong> {{ profile.rating }}</p>

      <button class="edit-button" @click="onEditProfile">Edit Profile</button>
    </template>
  </pv-card>
</template>

<style scoped>
h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.bio-section {
  margin-bottom: 1.5rem;
}

h4 {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

p {
  font-size: 0.95rem;
  color: #34495e;
  line-height: 1.5;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

input {
  padding: 0.6rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.edit-button {
  background-color: #3498db;
  color: white;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
</style>