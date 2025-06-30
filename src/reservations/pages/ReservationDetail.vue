<script setup>
import { ref } from 'vue'
import ModalComponent from "@/reservations/components/ModalComponent.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const form = ref({
  startDateTime: null,
  endDateTime: null,
  repetition: null,
  address: '',
  childName: '',
  childAge: null,
  specialNeeds: '',
  additionalInfo: ''
})

const goToReservationList = () => {
  router.push(`/reservation-list`)
}

const showModal = ref(false)

const repetitionOptions = ref([
  { label: 'One-time', value: 'one-time' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' }
])

// Functions to handle age increment/decrement
const incrementAge = () => {
  if (form.value.childAge === null) {
    form.value.childAge = 1
  } else if (form.value.childAge < 18) {
    form.value.childAge++
  }
}

const decrementAge = () => {
  if (form.value.childAge === null) {
    form.value.childAge = 0
  } else if (form.value.childAge > 0) {
    form.value.childAge--
  }
}

// Handle age input change
const handleAgeChange = (event) => {
  const value = parseInt(event.target.value)
  if (!isNaN(value) && value >= 0 && value <= 18) {
    form.value.childAge = value
  } else if (event.target.value === '') {
    form.value.childAge = null
  }
}
</script>

<template>
  <div class="reservation-container">
    <!-- Background decorative elements -->
    <div class="bg-decoration">
      <div class="decoration-circle decoration-1"></div>
      <div class="decoration-circle decoration-2"></div>
      <div class="decoration-circle decoration-3"></div>
    </div>

    <div class="reservation-card">
<!--      <div class="reservation-header">
        <div class="header-icon">
          <i class="icon-calendar"></i>
        </div>
        <h2>Create New Reservation</h2>
        <p class="reservation-description">
          Fill in the details below to book your perfect babysitter. We'll match you with
          qualified caregivers who meet your specific needs and preferences.
        </p>
      </div>-->

      <div class="reservation-grid">
        <!-- Left side - Reservation Information -->
        <div class="reservation-section">
          <div class="section-header">
            <div class="section-icon">
              <i class="icon-clock"></i>
            </div>
            <h3>Schedule & Location</h3>
          </div>

          <div class="time-grid">
            <div class="form-field">
              <label for="startDateTime">
                <i class="icon-calendar"></i> Start Date & Time
              </label>
              <input
                  type="datetime-local"
                  id="startDateTime"
                  v-model="form.startDateTime"
                  class="form-control"
                  :class="{ invalid: !form.startDateTime }"
              />
            </div>

            <div class="form-field">
              <label for="endDateTime">
                <i class="icon-calendar"></i> End Date & Time
              </label>
              <input
                  type="datetime-local"
                  id="endDateTime"
                  v-model="form.endDateTime"
                  class="form-control"
                  :class="{ invalid: !form.endDateTime }"
              />
            </div>
          </div>

          <div class="form-field">
            <label for="repetition">
              <i class="icon-refresh"></i>
              Frequency
            </label>
            <select
                v-model="form.repetition"
                id="repetition"
                class="form-control"
            >
              <option value="">How often do you need care?</option>
              <option
                  v-for="option in repetitionOptions"
                  :key="option.value"
                  :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="form-field">
            <label for="address">
              <i class="icon-location"></i>
              Address
            </label>
            <input
                type="text"
                v-model="form.address"
                id="address"
                class="form-control"
                placeholder="Where should the caregiver come?"
            />
          </div>
        </div>

        <!-- Right side - Child Information -->
        <div class="reservation-section">
          <div class="section-header">
            <div class="section-icon">
              <i class="icon-heart"></i>
            </div>
            <h3>Child Details</h3>
          </div>

          <div class="form-field">
            <label for="childName">
              <i class="icon-user"></i>
              Child's Name
            </label>
            <input
                type="text"
                v-model="form.childName"
                id="childName"
                class="form-control"
                placeholder="What's your little one's name?"
            />
          </div>

          <div class="form-field">
            <label for="childAge">
              <i class="icon-star"></i>
              Child's Age
            </label>
            <div class="age-input-wrapper">
              <button
                  type="button"
                  class="age-btn age-btn-minus"
                  @click="decrementAge"
              >
                <i class="icon-minus"></i>
              </button>
              <input
                  type="number"
                  v-model="form.childAge"
                  id="childAge"
                  class="form-control age-input"
                  min="0"
                  max="18"
                  placeholder="Age"
                  @input="handleAgeChange"
              />
              <button
                  type="button"
                  class="age-btn age-btn-plus"
                  @click="incrementAge"
              >
                <i class="icon-plus"></i>
              </button>
            </div>
          </div>

          <div class="form-field">
            <label for="specialNeeds">
              <i class="icon-info"></i>
              Special Requirements
            </label>
            <input
                type="text"
                v-model="form.specialNeeds"
                id="specialNeeds"
                class="form-control"
                placeholder="Any allergies, medical needs, or special care?"
            />
          </div>

          <div class="form-field">
            <label for="additionalInfo">
              <i class="icon-comment"></i>
              Additional Notes
            </label>
            <textarea
                v-model="form.additionalInfo"
                id="additionalInfo"
                class="form-control"
                rows="4"
                placeholder="Share any other important details that would help us find the perfect caregiver..."
            ></textarea>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <div class="action-content">
          <div class="action-info">
            <h4>Ready to find your caregiver?</h4>
            <p>We'll connect you with qualified babysitters in your area</p>
          </div>
          <button
              class="submit-button"
              @click="showModal = true"
          >
            <span>Find Caregivers</span>
            <i class="icon-search"></i>
          </button>
        </div>
      </div>
    </div>

    <ModalComponent :visible="showModal" @close="showModal = false">
      <div class="modal-content-wrapper">
        <div class="modal-icon">
          <i class="icon-check"></i>
        </div>
        <h2 class="modal-title">Confirm Your Reservation</h2>
        <p class="modal-content">
          You're about to create a new babysitting reservation. We'll start searching for
          qualified caregivers who match your requirements immediately.
        </p>
        <div class="modal-actions">
          <button
              class="modal-cancel-button"
              @click="showModal = false"
          >
            Go Back
          </button>
          <button
              class="modal-confirm-button"
              @click="goToReservationList"
          >
            Create Reservation
          </button>
        </div>
      </div>
    </ModalComponent>
  </div>
</template>

<style scoped>
/* Icon fonts - Using simple CSS shapes for icons */
.icon-calendar::before { content: "📅"; }
.icon-clock::before { content: "🕐"; }
.icon-refresh::before { content: "🔄"; }
.icon-location::before { content: "📍"; }
.icon-heart::before { content: "❤️"; }
.icon-user::before { content: "👤"; }
.icon-star::before { content: "⭐"; }
.icon-info::before { content: "ℹ️"; }
.icon-comment::before { content: "💬"; }
.icon-search::before { content: "🔍"; }
.icon-check::before { content: "✅"; }
.icon-plus::before { content: "+"; }
.icon-minus::before { content: "−"; }

/* Base styles and animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reservation-container {
  min-height: 100vh;
/*  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);*/
  position: relative;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* Background decorative elements */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.decoration-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.decoration-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.decoration-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 60%;
  animation-delay: 4s;
}

.reservation-card {
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  box-shadow:
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.8s ease;
}

.reservation-header {
  text-align: center;
  padding: 3rem 2rem 2rem;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  position: relative;
}

.reservation-header::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
}

.header-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  font-size: 2rem;
}

.reservation-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.reservation-description {
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.95;
}

.reservation-grid {
  display: grid;
  gap: 3rem;
  padding: 2rem 2rem 0;
}

@media (min-width: 1024px) {
  .reservation-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.reservation-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 1rem;
  color: white;
  font-size: 1.2rem;
}

.section-header h3 {
  font-weight: 700;
  font-size: 1.5rem;
  color: #1e293b;
  margin: 0;
}

.form-field {
  margin-bottom: 1.5rem;
}

.form-field label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
}

.form-field label i {
  font-size: 1rem;
}

.time-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, 1fr);
}

/* Form controls */
.form-control {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-family: inherit;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow:
      0 0 0 4px rgba(102, 126, 234, 0.1),
      0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.form-control:hover {
  border-color: #667eea;
  box-shadow:
      0 0 0 4px rgba(102, 126, 234, 0.05),
      0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

select.form-control {
  cursor: pointer;
}

textarea.form-control {
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
}

/* Age input special styling */
.age-input-wrapper {
  display: flex;
  align-items: center;
  gap: 0;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  background: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.age-input-wrapper:hover,
.age-input-wrapper:focus-within {
  border-color: #667eea;
  box-shadow:
      0 0 0 4px rgba(102, 126, 234, 0.1),
      0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.age-input {
  border: none !important;
  box-shadow: none !important;
  text-align: center;
  flex-grow: 1;
  transform: none !important;
  padding: 0.75rem;
}

.age-input:focus {
  outline: none;
  border: none !important;
  box-shadow: none !important;
}

.age-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.3s ease;
  margin: 0.25rem;
}

.age-btn:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
  transform: scale(1.05);
}

.age-btn:active {
  transform: scale(0.95);
}

/* Form actions */
.form-actions {
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-top: 1px solid #e2e8f0;
}

.action-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  gap: 2rem;
}

.action-info h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.action-info p {
  color: #64748b;
  font-size: 1rem;
}

.submit-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  min-width: 200px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.submit-button:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

/* Modal enhancements */
.modal-content-wrapper {
  text-align: center;
  padding: 1rem;
}

.modal-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 50%;
  margin-bottom: 1.5rem;
  color: white;
  font-size: 2rem;
}

.modal-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
}

.modal-content {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.modal-cancel-button {
  background: none;
  color: #64748b;
  border: 2px solid #e2e8f0;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.modal-cancel-button:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.modal-confirm-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  cursor: pointer;
}

.modal-confirm-button:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

/* Invalid state */
.invalid {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1) !important;
}

/* Responsive design */
@media (max-width: 1024px) {
  .reservation-container {
    padding: 1rem;
  }

  .reservation-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1.5rem;
  }

  .action-content {
    flex-direction: column;
    text-align: center;
  }

  .reservation-header {
    padding: 2rem 1rem;
  }

  .reservation-header h2 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .time-grid {
    grid-template-columns: 1fr;
  }

  .modal-actions {
    flex-direction: column;
  }

  .decoration-circle {
    display: none;
  }
}
</style>