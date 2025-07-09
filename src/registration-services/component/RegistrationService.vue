<script>
import { Babysitter } from "../model/babysitter.entity.js";

export default {
  name: "babysitter-card",
  props: {
    profile: { type: Babysitter, required: true }
  },
  data() {
    return {
      isEditing: false,
      form: { ...this.profile }
    };
  },
  watch: {
    profile: {
      handler(newVal) {
        this.form = { ...newVal };
      },
      deep: true
    }
  },
  methods: {
    startEdit() {
      this.form = { ...this.profile };
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
      this.form = { ...this.profile };
    },
    saveProfile() {
      // Aquí podrías emitir un evento o llamar a un servicio para guardar
      this.$emit('update:profile', { ...this.form });
      this.isEditing = false;
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
        <p v-if="!isEditing">{{ profile.description }}</p>
        <textarea v-else v-model="form.description" placeholder="Biography"></textarea>
      </section>

      <form class="form-grid" v-if="isEditing">
        <input type="text" v-model="form.name" placeholder="Name" />
        <input type="email" v-model="form.email" placeholder="Email" />
        <input type="text" v-model="form.phone" placeholder="Phone" />
        <input type="text" v-model="form.location" placeholder="Location" />
        <input type="text" v-model="form.experience" placeholder="Experience" />
      </form>
      <div v-else class="form-grid">
        <div><strong>Name:</strong> {{ profile.name }}</div>
        <div><strong>Email:</strong> {{ profile.email }}</div>
        <div><strong>Phone:</strong> {{ profile.phone }}</div>
        <div><strong>Location:</strong> {{ profile.location }}</div>
        <div><strong>Experience:</strong> {{ profile.experience }}</div>
      </div>

      <p><strong>Average Rating:</strong> {{ profile.rating }}</p>

      <div>
        <button v-if="!isEditing" class="edit-button" @click="startEdit">Edit Profile</button>
        <div v-else>
          <button class="edit-button" style="background:#7f8c8d" @click="cancelEdit">Cancel</button>
          <button class="edit-button" @click="saveProfile">Save</button>
        </div>
      </div>
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

p, textarea {
  font-size: 0.95rem;
  color: #34495e;
  line-height: 1.5;
}

textarea {
  width: 100%;
  min-height: 60px;
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 0.6rem;
  margin-bottom: 1rem;
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
  margin-right: 0.5rem;
}
</style>