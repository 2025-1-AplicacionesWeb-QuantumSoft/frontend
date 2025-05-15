<script setup>
import { ref, onMounted } from 'vue'
import {Avatar} from "primevue";
import { useRoute, useRouter } from 'vue-router'
import {BabysitterService} from "@/reservations/service/reservation.service.js";
import Button from "primevue/button";
import ModalComponent from "@/reservations/components/ModalComponent.vue";
const router = useRouter()
const route = useRoute()
const babysitterId = ref(null)
const babysitter = ref(null)

const goBack = () => router.back()

const gotoReservationDetail = () => {
  router.push(`/reservation-detail`)
}
const showModal = ref(false)
onMounted(async () => {
  try {
    babysitterId.value = route.params.id
    console.log('babysitterId:', babysitterId.value)
    babysitter.value = await BabysitterService.getBabysitterById(babysitterId.value.toString());
    console.log('babysitterId:', babysitterId)
    console.log(babysitter.value)
  } catch (error) {
    console.error('Error al obtener reservas:', error)
  }
})
</script>

<template>
  <div class="profile-container">
    <button class="back-button" @click="goBack">
      <i class="pi pi-arrow-left"></i>
      Go back
    </button>

    <div v-if="babysitter" class="profile-grid">

      <div class="profile-card-wrapper">
        <div class="profile-card">
          <div class="profile-image-container">
            <img src="@/assets/profile1.jpg" alt="Profile Picture" class="profile-image" />
          </div>
          <div class="profile-content">
            <h2 class="profile-name">{{ babysitter.bankName }}</h2>
            <div class="profile-details">
              <div class="detail-item">
                <i class="pi pi-user"></i>
                <span>{{ babysitter.description }}</span>
              </div>
              <div class="detail-item">
                <i class="pi pi-map-marker"></i>
                <span>{{ babysitter.location }}</span>
              </div>
              <div class="detail-item">
                <i class="pi pi-language"></i>
                <span>{{ babysitter.languages }}</span>
              </div>
              <div class="detail-item">
                <i class="pi pi-briefcase"></i>
                <span>{{ babysitter.experience }}</span>
              </div>
              <div class="detail-item">
                <i class="pi pi-id-card"></i>
                <span>DNI: {{ babysitter.dni }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="profile-details-section">
        <h2 class="section-title">Biography</h2>
        <p class="profile-bio">
          {{ babysitter.bio || 'No biography available' }}
        </p>

        <h2 class="section-title">About service</h2>
        <div class="service-details-grid">
          <div class="service-details-column">
            <p class="service-detail">
              <strong>Laboral days:</strong> {{ babysitter.workingDays || 'Not specified' }}
            </p>
            <p class="service-detail">
              <strong>Schedule:</strong> {{ babysitter.schedule || 'Not specified' }}
            </p>
            <p class="service-detail">
              <strong>Fair per hour:</strong> S/ {{ babysitter.hourlyRate || 'Not specified' }}
            </p>
          </div>
          <div class="service-details-column">
            <p class="service-detail">
              <strong>Workaround:</strong>
            </p>
            <p>{{ babysitter.workArea || 'Not specified' }}</p>
          </div>
        </div>

        <div class="action-buttons">
          <button class="primary-button" @click="showModal = true">
            <i class="pi pi-calendar-plus"></i>
            Reserve
          </button>
          <button class="secondary-button">
            <i class="pi pi-envelope"></i>
            Contact
          </button>
        </div>
      </div>
    </div>

    <div v-else class="loading-message">
      <p>Loading babysitter details...</p>
    </div>

<!--    <div class="reviews">
      <div v-for="(review, i) in reviews" :key="i" class="review-card">
        <img :src="review.image" class="review-img" />
        <div class="review-content">
          <strong>{{ review.name }}</strong>
          <div class="stars">⭐ {{ review.rating }}</div>
          <p>{{ review.text }}</p>
        </div>
      </div>
    </div>-->

    <ModalComponent :visible="showModal" @close="showModal = false">
      <h2 class="modal-title">Reservation</h2>
      <p class="modal-content">
        Are you sure you want to continue with the reservation and programming paid?
      </p>
      <div class="modal-actions">
        <Button label="Cancel" class="modal-cancel-button" @click="showModal = false" />
        <Button label="Go next" class="modal-confirm-button" @click="gotoReservationDetail" />
      </div>
    </ModalComponent>
  </div>
</template>

<style scoped>

.profile-container {
  padding: 1rem;
  background-color: #f8f9fa;
  min-height: 50vh;
  color: #2c3e50;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.back-button {
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.back-button:hover {
  color: #2980b9;
}

.back-button i {
  font-size: 0.9rem;
}

.profile-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .profile-grid {
    grid-template-columns: 1fr 2fr;
  }
}

.profile-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-image-container {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-content {
  padding: 1.5rem;
}

.profile-name {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.detail-item i {
  color: #3498db;
}

.profile-details-section {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.profile-bio {
  margin-bottom: 2rem;
  line-height: 1.6;
  color: #34495e;
}

.service-details-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .service-details-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.service-detail {
  margin-bottom: 1rem;
  line-height: 1.6;
}


.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
.modal-confirm-button{
 background-color: var(--color-primary);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}
.primary-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.primary-button:hover {
  background-color: #2980b9;
}

.secondary-button {
  background-color: white;
  color: #3498db;
  border: 1px solid #3498db;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
}

.secondary-button:hover {
  background-color: #f8f9fa;
}

.loading-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #7f8c8d;
}

.pi {
  font-size: 0.9rem;
}

.reviews {
  margin-top: 3rem;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.review-card {
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  min-width: 200px;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
}

.review-img {
  width: 45px;
  height: 45px;
  border-radius: 9999px;
  object-fit: cover;
}

.review-content {
  font-size: 0.9rem;
}

.stars {
  font-size: 0.85rem;
  color: #f59e0b;
  margin: 0.2rem 0;
}
</style>