<script setup>
import { ref, onMounted } from 'vue';
import { getBabysitters } from "@/registration-services/service/registration.service.js";
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';

const babysitter = ref(null);
const form = ref({
  name: '',
  email: '',
  phone: '',
  location: '',
  experience: '',
  lastname: '',
  description: '',
  about: '',
  updateP: '',
  confirmP: '',
  rating: ''
});

onMounted(async () => {
  const data = await getBabysitters();
  babysitter.value = data.length > 0 ? data[0] : null;
  if (babysitter.value) {
    form.value = { ...babysitter.value };
  }
});

const updateProfile = () => {
  babysitter.value = { ...form.value };
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
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                size="xlarge"
                shape="circle"
            />
          </div>

          <div class="form-grid">
            <!-- Personal Information -->
            <div class="form-section">
              <div class="section-header">
                <h3>Personal Information</h3>
              </div>

              <div class="form-field">
                <label for="name">Name</label>
                <InputText
                    v-model="form.name"
                    id="name"
                    class="form-control"
                    placeholder="Enter your name"
                />
              </div>

              <div class="form-field">
                <label for="lastname">Last Name</label>
                <InputText
                    v-model="form.lastname"
                    id="lastname"
                    class="form-control"
                    placeholder="Enter your last name"
                />
              </div>

              <div class="form-field">
                <label for="email">Email</label>
                <InputText
                    v-model="form.email"
                    id="email"
                    type="email"
                    class="form-control"
                    placeholder="Enter your email"
                />
              </div>

              <div class="form-field">
                <label for="phone">Phone</label>
                <InputText
                    v-model="form.phone"
                    id="phone"
                    class="form-control"
                    placeholder="Enter your phone number"
                />
              </div>
            </div>

            <!-- Professional Information -->
            <div class="form-section">
              <div class="section-header">
                <h3>Professional Information</h3>
              </div>

              <div class="form-field">
                <label for="description">Biography</label>
                <Textarea
                    v-model="form.description"
                    id="description"
                    rows="4"
                    class="form-control"
                    placeholder="Tell us about yourself..."
                />
              </div>

              <div class="form-field">
                <label for="experience">Experience (years)</label>
                <InputText
                    v-model="form.experience"
                    id="experience"
                    type="number"
                    class="form-control"
                    placeholder="Years of experience"
                />
              </div>

              <div class="form-field">
                <label for="location">Location</label>
                <InputText
                    v-model="form.location"
                    id="location"
                    class="form-control"
                    placeholder="Enter your location"
                />
              </div>
            </div>
          </div>

          <div class="form-actions">
            <Button
                label="Update Profile"
                icon="pi pi-check"
                class="submit-button"
                @click="updateProfile"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.profile-container {
  min-height: 100vh;
  padding: 1rem 2rem;
  background-color: #fffaf0;
  color: #1f2937;
}

.profile-card {
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 0.75rem;
}

.profile-header {
  padding-bottom: 1rem;
}

.profile-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #9c4221;
  margin-bottom: 0.5rem;
}

.profile-description {
  color: #4b5563;
  font-size: 0.875rem;
}

.avatar-section {
  text-align: center;
  margin-bottom: 2rem;
}

.form-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #9c4221;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.form-field {
  margin-bottom: 1rem;
}

.form-field label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.form-control {
  width: 100%;
}

.form-actions {
  margin-top: 2rem;
  text-align: right;
}

.submit-button {
  background-color: #f97316;
  border: none;
  padding: 0.75rem 1.5rem;
}

.submit-button:hover {
  background-color: #ea580c;
}

:deep(.p-inputtext),
:deep(.p-textarea) {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  width: 100%;
  transition: border-color 0.2s;
}

:deep(.p-inputtext:focus),
:deep(.p-textarea:focus) {
  outline: none;
  border-color: #f97316;
  box-shadow: 0 0 0 0.2rem rgba(249, 115, 22, 0.2);
}
</style>