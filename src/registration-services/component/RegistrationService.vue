<script>
import { Babysitter } from "../model/babysitter.entity.js";
import {useAuthenticationStore} from "@/iam/services/authentication.store.js";

export default {
  name: "babysitter-card",
  props: {
    profile: { type: Object, required: true } // Object porque ahora puede ser parent o babysitter
  },
  data() {
    return {
      isEditing: false,
      form: { ...this.profile },
      authStore: useAuthenticationStore()
    };
  },
  computed: {
    currentRole() {
      return this.authStore.currentRole; // 'babysitter' o 'parent'
    }
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
      this.$emit('update:profile', { ...this.form });
      this.isEditing = false;
    }
  }
};
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
        <input type="text" v-model="form.phone" placeholder="Phone" />

        <template v-if="currentRole === 'babysitter'">
          <input type="text" v-model="form.description" placeholder="Description" />
          <input type="text" v-model="form.languages" placeholder="Languages" />
          <input type="text" v-model="form.location" placeholder="Location" />
          <input type="text" v-model="form.accountBank" placeholder="Bank Account" />
          <input type="text" v-model="form.bankName" placeholder="Bank Name" />
          <input type="text" v-model="form.typeAccountBank" placeholder="Type of Account" />
          <input type="text" v-model="form.dni" placeholder="DNI" />
          <input type="text" v-model="form.experienceLevel" placeholder="Experience Level" />
        </template>

        <template v-else-if="currentRole === 'parent'">
          <input type="text" v-model="form.address" placeholder="Address" />
          <input type="number" v-model="form.childrenCount" placeholder="Number of Children" />
          <input type="text" v-model="form.preferences" placeholder="Preferences" />
          <input type="text" v-model="form.city" placeholder="City" />
        </template>
      </form>

      <div v-else class="form-grid">
        <div><strong>Name:</strong> {{ profile.name }}</div>
        <div><strong>Phone:</strong> {{ profile.phone }}</div>

        <template v-if="currentRole === 'babysitter'">
          <div><strong>Description:</strong> {{ profile.description }}</div>
          <div><strong>Languages:</strong> {{ profile.languages }}</div>
          <div><strong>Location:</strong> {{ profile.location }}</div>
          <div><strong>Bank Account:</strong> {{ profile.accountBank }}</div>
          <div><strong>Bank Name:</strong> {{ profile.bankName }}</div>
          <div><strong>Type of Account:</strong> {{ profile.typeAccountBank }}</div>
          <div><strong>DNI:</strong> {{ profile.dni }}</div>
          <div><strong>Experience Level:</strong> {{ profile.experienceLevel }}</div>
          <div><strong>Rating:</strong> {{ profile.rating }}</div>
        </template>

        <template v-else-if="currentRole === 'parent'">
          <div><strong>Address:</strong> {{ profile.address }}</div>
          <div><strong>Children:</strong> {{ profile.childrenCount }}</div>
          <div><strong>Preferences:</strong> {{ profile.preferences }}</div>
          <div><strong>City:</strong> {{ profile.city }}</div>
        </template>
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