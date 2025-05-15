<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button'
import Select from 'primevue/select';
import InputNumber from 'primevue/inputnumber';
import ModalComponent from "@/reservations/components/ModalComponent.vue";
import {useRouter} from "vue-router";
const router = useRouter()
const form = ref({
  dateStart: null,
  timeStart: null,
  timeEnd: null,
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
</script>

<template>
  <div class="reservation-container">
    <div class="reservation-card">
      <div class="reservation-header">
        <h2>Reservation Details</h2>
        <p class="reservation-description">
          Please fill in all the required details for your child care reservation.
          We'll use this information to match you with the perfect caregiver.
        </p>
      </div>

      <div class="reservation-grid">

        <div class="reservation-section">
          <div class="section-header">
            <h3>Reservation Information</h3>
          </div>

          <div class="form-field">
            <label for="dateStart">Date</label>
            <DatePicker
                v-model="form.dateStart"
                inputId="dateStart"
                class="form-control"
                :class="{ 'invalid': !form.dateStart }"
                placeholder="Select a date"
                dateFormat="dd/mm/yy"
                showIcon
            />
          </div>

          <div class="time-grid">
            <div class="form-field">
              <label for="timeStart">Start Time</label>
              <DatePicker
                  v-model="form.timeStart"
                  inputId="timeStart"
                  class="form-control"
                  timeOnly
                  hourFormat="12"
                  placeholder="Select time"
                  showIcon
              />
            </div>

            <div class="form-field">
              <label for="timeEnd">End Time</label>
              <DatePicker
                  v-model="form.timeEnd"
                  inputId="timeEnd"
                  class="form-control"
                  timeOnly
                  hourFormat="12"
                  placeholder="Select time"
                  showIcon
              />
            </div>
          </div>

          <div class="form-field">
            <label for="repetition">Repetition</label>
            <Select
                v-model="form.repetition"
                inputId="repetition"
                :options="repetitionOptions"
                optionLabel="label"
                placeholder="Select repetition"
                class="form-control"
            />
          </div>

          <div class="form-field">
            <label for="address">Address</label>
            <InputText
                v-model="form.address"
                id="address"
                class="form-control"
                placeholder="Enter your address"
            />
          </div>
        </div>

        <!-- Right side - Child Information -->
        <div class="reservation-section">
          <div class="section-header">
            <h3>Child Information</h3>
          </div>

          <div class="form-field">
            <label for="childName">Child's Name</label>
            <InputText
                v-model="form.childName"
                id="childName"
                class="form-control"
                placeholder="Enter child's name"
            />
          </div>

          <div class="form-field">
            <label for="childAge">Child's Age</label>
            <InputNumber
                v-model="form.childAge"
                inputId="childAge"
                class="form-control"
                :min="0"
                :max="18"
                placeholder="Enter age"
                showButtons
                buttonLayout="horizontal"
                :step="1"
                decrementButtonClass="p-button-secondary"
                incrementButtonClass="p-button-secondary"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
            />
          </div>

          <div class="form-field">
            <label for="specialNeeds">Special Needs (if any)</label>
            <InputText
                v-model="form.specialNeeds"
                id="specialNeeds"
                class="form-control"
                placeholder="Describe any special needs"
            />
          </div>

          <div class="form-field">
            <label for="additionalInfo">Additional Information</label>
            <Textarea
                v-model="form.additionalInfo"
                id="additionalInfo"
                class="form-control"
                rows="4"
                placeholder="Any other important information..."
            />
          </div>
        </div>
      </div>

      <div class="form-actions">
        <Button
            label="Continue"
            icon="pi pi-arrow-right"
            iconPos="right"
            class="submit-button"
            @click="showModal = true"
        />
      </div>
    </div>

    <ModalComponent :visible="showModal" @close="showModal = false">
      <h2 class="modal-title">Confirmation</h2>
      <p class="modal-content">
        Are you sure you want to reserve a babysitter?
      </p>
      <div class="modal-actions">
        <Button label="Cancel" class="modal-cancel-button" @click="showModal = false" />
        <Button label="Confirm" class="modal-confirm-button" @click="goToReservationList" />
      </div>
    </ModalComponent>
  </div>
</template>

<style>
/* Base styles */
.reservation-container {
  min-height: 100vh;
  padding: 1rem 2rem;
  background-color: #fffaf0;
  color: #1f2937;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.reservation-card {
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  padding: 1.5rem;
}

.reservation-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #9c4221;
}

.reservation-description {
  max-width: 42rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: #4b5563;
}

.reservation-grid {
  display: grid;
  gap: 2rem;
  width: 100%;
}

@media (min-width: 768px) {
  .reservation-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.reservation-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-header h3 {
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1rem;
  color: #9c4221;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
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

.time-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
}

.form-control {
  width: 100%;
}

/* Form elements */
.p-inputtext,
.p-inputtextarea,
.p-calendar,
.p-dropdown {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  width: 100%;
  transition: border-color 0.2s;
}

.p-inputtext:focus,
.p-inputtextarea:focus,
.p-calendar:focus,
.p-dropdown:focus {
  outline: none;
  border-color: #f97316;
  box-shadow: 0 0 0 0.2rem rgba(249, 115, 22, 0.2);
}

.invalid {
  border-color: #ef4444;
}

/* Buttons */
.submit-button {
  background-color: #f97316;
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.submit-button:hover {
  background-color: #ea580c;
}

.modal-button {
  margin-top: 1rem;
}

/* Modal styles */
.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.modal-content {
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.modal-cancel-button {
  background: none;
  color: #4b5563;
}

.modal-confirm-button {
  background-color: #f97316;
  border: none;
  color: white;
}

/* PrimeVue component overrides */
:deep(.p-calendar .p-inputtext) {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

:deep(.p-dropdown) {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

:deep(.p-inputtext) {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

:deep(.p-inputtextarea) {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

:deep(.p-button) {
  transition: all 0.2s;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
</style>