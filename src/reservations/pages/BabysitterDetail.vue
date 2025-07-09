<script setup>
import { ref, onMounted } from 'vue'
import {Avatar} from "primevue";
import { useRoute, useRouter } from 'vue-router'
import {BabysitterService} from "@/reservations/service/reservation.service.js";
import Button from "primevue/button";
import ModalComponent from "@/reservations/components/ModalComponent.vue";
import {useAuthenticationStore} from "@/iam/services/authentication.store.js";

const authStore = useAuthenticationStore();
const router = useRouter()
const route = useRoute()
const babysitterId = ref(null)
const babysitter = ref(null)

const goBack = () => router.back()

const gotoReservationDetail = () => {
  router.push({name:'reservation-detail', query: { babysitterId: babysitterId.value }})
}

const showModal = ref(false)

// Function to generate star rating display
const getStarRating = (rating) => {
  const fullStars = Math.floor(rating || 0)
  const hasHalfStar = (rating || 0) % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return '★'.repeat(fullStars) +
      (hasHalfStar ? '☆' : '') +
      '☆'.repeat(emptyStars)
}

onMounted(async () => {
  try {
    babysitterId.value = route.params.id
    console.log('babysitterId:', babysitterId.value)
    babysitter.value = await BabysitterService.getBabysitterById(babysitterId.value.toString());
    console.log('babysitter:', babysitter.value)
  } catch (error) {
    console.error('Error al obtener babysitter:', error)
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
      <!-- Profile Card -->
      <div class="profile-card-wrapper">
        <div class="profile-card">
          <div class="profile-image-container">
            <img
                :src="`https://randomuser.me/api/portraits/women/${babysitter.id}.jpg`"
                :alt="`${babysitter.name} Profile Picture`"
                class="profile-image"
            />
            <div class="rating-badge">
              <div class="rating-stars">{{ getStarRating(babysitter.rating) }}</div>
              <div class="rating-number">{{ babysitter.rating || 0 }}/5</div>
            </div>
          </div>

          <div class="profile-content">
            <h1 class="profile-name">{{ babysitter.name }}</h1>
            <div class="profile-details">
              <div class="detail-item">
                <i class="pi pi-user icon"></i>
                <span class="detail-text">{{ babysitter.description || 'Professional babysitter' }}</span>
              </div>
              <div class="detail-item">
                <i class="pi pi-phone icon"></i>
                <span class="detail-text">{{ babysitter.phone || 'Contact available' }}</span>
              </div>
              <div class="detail-item">
                <i class="pi pi-language icon"></i>
                <span class="detail-text">{{ babysitter.languages || 'Languages available' }}</span>
              </div>
              <div class="detail-item">
                <i class="pi pi-briefcase icon"></i>
                <span class="detail-text">{{ babysitter.experienceLevel || 'Experience level not specified' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="profile-details-section">
        <div class="section-header">
          <h2 class="section-title">About {{ babysitter.name }}</h2>
          <div class="section-subtitle">Professional childcare services</div>
        </div>

        <div class="bio-section">
          <p class="profile-bio">
            {{ babysitter.description || 'Experienced and caring babysitter dedicated to providing excellent childcare services. Safety and fun are my top priorities when caring for children.' }}
          </p>
        </div>

        <div class="service-info">
          <h3 class="service-title">Service Information</h3>
          <div class="service-details-grid">
            <div class="service-card">
              <div class="service-icon">
                <i class="pi pi-star"></i>
              </div>
              <div class="service-content">
                <h4>Experience Level</h4>
                <p>{{ babysitter.experienceLevel || 'Professional' }}</p>
              </div>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="pi pi-language"></i>
              </div>
              <div class="service-content">
                <h4>Languages</h4>
                <p>{{ babysitter.languages || 'Multiple languages' }}</p>
              </div>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="pi pi-phone"></i>
              </div>
              <div class="service-content">
                <h4>Contact</h4>
                <p>{{ babysitter.phone || 'Available via platform' }}</p>
              </div>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="pi pi-heart"></i>
              </div>
              <div class="service-content">
                <h4>Rating</h4>
                <p>{{ babysitter.rating || 'New provider' }}/5 stars</p>
              </div>
            </div>
          </div>
        </div>

        <div class="action-buttons" v-if="authStore.role === 'parent'">
          <button class="primary-button" @click="showModal = true">
            <i class="pi pi-calendar-plus"></i>
            Reserve Now
          </button>
<!--          <button class="secondary-button">
            <i class="pi pi-envelope"></i>
            Send Message
          </button>-->
        </div>
      </div>
    </div>

    <div v-else class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading babysitter details...</p>
    </div>

    <ModalComponent :visible="showModal" @close="showModal = false">
      <h2 class="modal-title">Confirm Reservation</h2>
      <p class="modal-content">
        Are you sure you want to continue with the reservation for {{ babysitter?.name }}?
      </p>
      <div class="modal-actions">
        <Button label="Cancel" class="modal-cancel-button" @click="showModal = false" />
        <Button label="Continue" class="modal-confirm-button" @click="gotoReservationDetail" />
      </div>
    </ModalComponent>
  </div>
</template>

<style scoped>
.profile-container {
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.back-button {
  background: var(--color-primary);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  padding: 0.75rem 1rem;
  margin-bottom: .7rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.profile-grid {
  display: grid;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

}

@media (min-width: 768px) {
  .profile-grid {
    grid-template-columns: 350px 1fr;
    overflow-y: auto;
    scroll-behavior: smooth;
  }
}

.profile-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
}

.profile-image-container {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.profile-card:hover .profile-image {
  transform: scale(1.05);
}

.rating-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.rating-stars {
  color: #ffd700;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.rating-number {
  font-size: 0.75rem;
  font-weight: 600;
  color: #4a5568;
}

.profile-content {
  padding: 2rem;
}

.profile-name {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #2d3748;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.detail-item:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateX(4px);
}

.icon {
  color: #667eea;
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
}

.detail-text {
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
}

.profile-details-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.section-header {
  margin-bottom: 2rem;
  text-align: center;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: #718096;
  font-size: 1rem;
  font-weight: 500;
}

.bio-section {
  margin-bottom: 3rem;
}

.profile-bio {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a5568;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.service-info {
  margin-bottom: 3rem;
}

.service-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
}

.service-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.service-card {
  background: rgba(102, 126, 234, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.service-card:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.service-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.service-icon i {
  color: white;
  font-size: 1.2rem;
}

.service-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.service-content p {
  color: #718096;
  font-size: 0.9rem;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.primary-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

.secondary-button {
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  border: 2px solid #667eea;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.secondary-button:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  color: white;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1.1rem;
  font-weight: 500;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
}

.modal-content {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.modal-cancel-button {
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.modal-cancel-button:hover {
  background: #cbd5e0;
}

.modal-confirm-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.modal-confirm-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

@media (max-width: 768px) {
  .profile-container {
    padding: 1rem;
  }

  .profile-content {
    padding: 1.5rem;
  }

  .profile-details-section {
    padding: 2rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
    justify-content: center;
  }
}
</style>