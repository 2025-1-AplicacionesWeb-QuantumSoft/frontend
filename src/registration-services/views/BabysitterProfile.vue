<script setup>
import { ref, onMounted } from 'vue';
import { BabysitterService } from "@/registration-services/service/registration.service.js";
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';

const babysitter = ref(null);
const form = ref({});
const isEditing = ref(false);

onMounted(async () => {
  const data = await BabysitterService.getBabysitters();
  babysitter.value = data.length > 0 ? data[0] : null;
  if (babysitter.value) {
    form.value = { ...babysitter.value };
  }
});

const startEdit = () => {
  form.value = { ...babysitter.value };
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
};

const saveProfile = () => {
  babysitter.value = { ...form.value };
  isEditing.value = false;
  // Aquí podrías llamar a un servicio para guardar en backend
};
</script>

<template>
  <div class="profile-container">
    <Card class="profile-card">
      <template #header>
        <div class="profile-header">
          <h2>Your Profile</h2>
          <p class="profile-description">
            Update your profile information to help parents know more about you.
          </p>
        </div>
      </template>

      <template #content>
        <div class="profile-content">
          <div class="avatar-section">
            <Avatar
                :image="babysitter?.avatar || 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png'"
                size="xlarge"
                shape="circle"
            />
          </div>

          <div v-if="!isEditing" class="profile-view">
            <h3 class="profile-name">{{ babysitter?.name }} {{ babysitter?.lastname }}</h3>
            <div class="profile-details">
              <div class="detail-item"><i class="pi pi-envelope"></i> {{ babysitter?.email }}</div>
              <div class="detail-item"><i class="pi pi-phone"></i> {{ babysitter?.phone }}</div>
              <div class="detail-item"><i class="pi pi-map-marker"></i> {{ babysitter?.location }}</div>
              <div class="detail-item"><i class="pi pi-star"></i> {{ babysitter?.experience }} years</div>
            </div>
            <div class="profile-bio">
              <strong>Biography:</strong>
              <p>{{ babysitter?.description }}</p>
            </div>
            <div class="form-actions">
              <Button label="Edit Profile" icon="pi pi-pencil" class="submit-button" @click="startEdit" />
            </div>
          </div>

          <div v-else class="profile-edit">
            <div class="form-grid">
              <div class="form-section">
                <div class="section-header">
                  <h3>Personal Information</h3>
                </div>
                <div class="form-field">
                  <label for="name">Name</label>
                  <InputText v-model="form.name" id="name" class="form-control" />
                </div>
                <div class="form-field">
                  <label for="lastname">Last Name</label>
                  <InputText v-model="form.lastname" id="lastname" class="form-control" />
                </div>
                <div class="form-field">
                  <label for="email">Email</label>
                  <InputText v-model="form.email" id="email" type="email" class="form-control" />
                </div>
                <div class="form-field">
                  <label for="phone">Phone</label>
                  <InputText v-model="form.phone" id="phone" class="form-control" />
                </div>
              </div>
              <div class="form-section">
                <div class="section-header">
                  <h3>Professional Information</h3>
                </div>
                <div class="form-field">
                  <label for="description">Biography</label>
                  <Textarea v-model="form.description" id="description" rows="4" class="form-control" />
                </div>
                <div class="form-field">
                  <label for="experience">Experience (years)</label>
                  <InputText v-model="form.experience" id="experience" type="number" class="form-control" />
                </div>
                <div class="form-field">
                  <label for="location">Location</label>
                  <InputText v-model="form.location" id="location" class="form-control" />
                </div>
              </div>
            </div>
            <div class="form-actions">
              <Button label="Cancel" class="submit-button" severity="secondary" @click="cancelEdit" />
              <Button label="Save" icon="pi pi-check" class="submit-button" @click="saveProfile" />
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
/* (Puedes mantener tus estilos actuales, o adaptar los de BabysitterDetail si lo prefieres) */
</style>