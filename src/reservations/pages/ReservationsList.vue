<script setup>
import {onMounted, ref} from 'vue';
import {BabysitterService, ReservationService} from "@/reservations/service/reservation.service.js";

const reservations = ref([])
const babysitters = ref([])
const editingIndex = ref(null)
const editForm = ref({})

onMounted(async ()=>{
  try {
    reservations.value = await ReservationService.getReservationByBabysitterId(1);
    babysitters.value = await BabysitterService.getBabysitters();
    console.log(reservation.value)
    console.log(babysitters.value)
  } catch (error) {
    console.error('Error al obtener reservas:', error)
  }
})

const reservation = ref([
  {
    id: 1,
    caregiver: 'John Doe',
    specialty: 'Professional Babysitter',
    location: 'San Isidro, Lima',
    date: 'January 1st, 2024',
    time: 'From 9AM to 5PM (8 hours)',
    frequency: 'Weekly',
    status: 'Pending',
    image: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: 2,
    caregiver: 'Jane Smith',
    specialty: 'Child Care Expert',
    location: 'Miraflores, Lima',
    date: 'January 2nd, 2024',
    time: 'From 10AM to 6PM (8 hours)',
    frequency: 'Weekly',
    status: 'Realized',
    image: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 3,
    caregiver: 'Maria Garcia',
    specialty: 'Certified Nanny',
    location: 'Surco, Lima',
    date: 'January 3rd, 2024',
    time: 'From 8AM to 4PM (8 hours)',
    frequency: 'Weekly',
    status: 'Pending',
    image: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    id: 4,
    caregiver: 'Julio Cesar',
    specialty: 'Experienced Caretaker',
    location: 'Barranco, Lima',
    date: 'January 4th, 2024',
    time: 'From 9AM to 5PM (8 hours)',
    frequency: 'Weekly',
    status: 'Cancelled',
    image: 'https://randomuser.me/api/portraits/men/5.jpg'
  }
]);

const getStatusClass = (status) => {
  switch (status) {
    case 'pending': return 'status-pending';
    case 'confirmed': return 'status-confirmed';
    case 'cancelled': return 'status-cancelled';
    default: return 'status-default';
  }
};

const getFrequencyClass = (frequency) => {
  const frequencyMap = {
    'Daily': 'frequency-daily',
    'Weekly': 'frequency-weekly',
    'Monthly': 'frequency-monthly',
    'Once': 'frequency-once'
  };
  return frequencyMap[frequency] || 'frequency-weekly';
};

const startEdit = (index) => {
  editingIndex.value = index;
  editForm.value = {
    ...reservations.value[index],
    dateObj: new Date(reservations.value[index].date)
  };
};

const cancelEdit = () => {
  editingIndex.value = null;
  editForm.value = {};
};

const saveEdit = async () => {
  try {

    const originalReservation = reservations.value[editingIndex.value];

    function unwrap(obj) {
      const result = {}
      for (const key in obj) {
        const val = obj[key]
        result[key] = val?.value ?? val
      }
      return result
    }
    const updatedReservation = unwrap({
      ...originalReservation,
      startTime: new Date(editForm.value.startTime).toISOString(),
      endTime: new Date(editForm.value.endTime).toISOString(),
      frequency: editForm.value.frequency,
      address: editForm.value.address,
      specialNeeds: editForm.value.specialNeeds,
      additionalInfo: editForm.value.additionalInfo
    });
    delete updatedReservation.id

    const reservationId = editForm.value.id;
    console.log(updatedReservation);
    const response = await ReservationService.updateReservation(updatedReservation, reservationId);
    console.log('Response:', response.data);

    // Actualiza localmente
    reservations.value[editingIndex.value] = {
      ...updatedReservation,
      id: reservationId
    };
    console.log('Sending to backend:', updatedReservation);
    console.log('Reservation ID:', reservationId);
    console.log('Full URL:', `/api/reservations/${reservationId}`);
    // Limpia estado de edición
    editingIndex.value = null;
    editForm.value = {};

    alert('Reservation updated successfully!');

  } catch (error) {
    console.error('Error updating reservation:', error);
    alert('Error updating reservation. Please try again.');
  }
};


const cancelReservation = async (index) => {
  if (confirm('Are you sure you want to cancel this reservation?')) {
    try {
      // Update status to cancelled
      const reservationId = reservations.value[index].id;
      await ReservationService.deleteReservation(reservationId);
      reservations.value[index].status = 'Cancelled';

      console.log('Reservation cancelled:', reservations.value[index]);
      alert('Reservation cancelled successfully!');

    } catch (error) {
      console.error('Error cancelling reservation:', error);
      alert('Error cancelling reservation. Please try again.');
    }
  }
};
</script>

<template>
  <div class="reservations-app">
    <div class="app-background"></div>

    <header class="reservations-header">
      <h1 class="reservations-title">My Reservations</h1>
<!--      <p class="reservations-subtitle">Manage your babysitting appointments with style</p>-->
    </header>

    <div class="reservations-container">
      <div
          v-for="(reservation, index) in reservations"
          :key="reservation.id"
          :class="['reservation-bar', { 'edit-mode': editingIndex === index }]"
      >
        <div
            :class="['frequency-indicator', getFrequencyClass(reservation.frequency)]"
        ></div>

        <!-- View Mode -->
        <div v-if="editingIndex !== index" class="bar-content">
          <div class="info-container">
          <div class="caregiver-section">
            <div class="avatar-container">
              <img :src="reservation.image" :alt="reservation.caregiver" class="caregiver-avatar" />
              <div class="avatar-status" :class="getStatusClass(reservation.status)"></div>
            </div>
            <div class="caregiver-info">
              <h3 class="caregiver-name">{{ reservation.caregiver || 'Carol' }}</h3>
              <span class="caregiver-specialty">{{ reservation.specialty || 'Professional Caregiver' }}</span>
            </div>
          </div>

            <div class="details-section">
              <!-- Dirección -->
              <div class="detail-item">
                <svg class="detail-icon" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <div class="detail-text">
                  <label>Address: </label>
                  <span>{{ reservation.address }}</span>
                </div>
              </div>

              <!-- Fecha inicio -->
              <div class="detail-item">
                <svg class="detail-icon" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                </svg>
                <div class="detail-text">
                  <label>Start: </label>
                  <span>{{ new Date(reservation.startTime.value).toLocaleString() }}</span>
                </div>
              </div>

              <!-- Fecha fin -->
              <div class="detail-item">
                <svg class="detail-icon" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                  <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                <div class="detail-text">
                  <label>End: </label>
                  <span>{{ new Date(reservation.endTime.value).toLocaleString() }}</span>
                </div>
              </div>

              <!-- Frecuencia -->
              <div class="detail-item frequency-detail">
                <svg class="detail-icon" viewBox="0 0 24 24">
                  <path d="M4 5h16v2H4V5zm0 4h16v2H4V9zm0 4h16v2H4v-2zm0 4h16v2H4v-2z"/>
                </svg>
                <div class="detail-text">
                  <label>Frequency: </label>
                  <span>{{ reservation.frequency }}</span>
                </div>
              </div>
            </div>

        </div>
          <div class="action-container">
            <div class="status-section">
              <div :class="['status-badge', getStatusClass(reservation.status.value)]">
                {{ reservation.status.value }}
              </div>
            </div>

            <div class="actions-section" v-if="reservation.status.value === 'pending'">
              <button class="action-btn edit-btn" @click="startEdit(index)">
                <svg class="btn-icon" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                Edit
              </button>
              <button class="action-btn cancel-btn" @click="cancelReservation(index)">
                <svg class="btn-icon" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
                Cancel
              </button>
            </div>
          </div>
        </div>

        <!-- Edit Mode -->
        <div v-else class="edit-content">
          <div class="edit-header">
            <h3 class="edit-title">Edit Reservation</h3>
            <div class="edit-avatar">
              <img :src="reservation.image" alt="Babysitter" class="small-avatar" />
            </div>
          </div>

          <div class="edit-form">
            <!-- Location -->
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="edit-location">Location</label>
                <input
                    id="edit-location"
                    type="text"
                    v-model="editForm.address"
                    class="form-input"
                />
              </div>
            </div>

            <!-- Start & End Time -->
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="edit-start">Start Time</label>
                <input
                    id="edit-start"
                    type="datetime-local"
                    v-model="editForm.startTime"
                    class="form-input"
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="edit-end">End Time</label>
                <input
                    id="edit-end"
                    type="datetime-local"
                    v-model="editForm.endTime"
                    class="form-input"
                />
              </div>
            </div>

            <!-- Repetition/Frequency -->
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="edit-frequency">Frequency</label>
                <select
                    id="edit-frequency"
                    v-model="editForm.frequency"
                    class="form-input"
                >
                  <option value="Once">Once</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>

             Special Needs & Info
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="edit-special">Special Needs</label>
                <input
                    id="edit-special"
                    type="text"
                    v-model="editForm.specialNeeds"
                    class="form-input"
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="edit-info">Additional Info</label>
                <input
                    id="edit-info"
                    type="text"
                    v-model="editForm.additionalInfo"
                    class="form-input"
                />
              </div>
            </div>

            <!-- Actions -->
            <div class="form-actions">
              <button class="action-btn save-btn" @click="saveEdit">
                <svg class="btn-icon" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Save Changes
              </button>
              <button class="action-btn cancel-edit-btn" @click="cancelEdit">
                <svg class="btn-icon" viewBox="0 0 24 24">
                  <path
                      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                  />
                </svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Base Styles */
.reservations-app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/*.app-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: -1;
}*/

.reservations-header {
  text-align: center;

  color: white;
}

.reservations-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.reservations-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  font-weight: 400;
}

.reservations-container {
  max-width: 1400px;
  margin: 0 auto;
  height: 750px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: scroll;
  padding-right: 10px;
}

/* Reservation Bar */
.reservation-bar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 1.5rem 3rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

}

/*.reservation-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary));
  border-radius: 40px 40px 0 0;
}*/

.reservation-bar:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  background: rgba(255, 255, 255, 0.98);
}

.reservation-bar.edit-mode {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 2px solid #667eea;
  transform: scale(1.02);
}

.frequency-indicator {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.8);
}

.frequency-daily { background: linear-gradient(135deg, #10b981, #059669); }
.frequency-weekly { background: linear-gradient(135deg, #3b82f6, #2563eb); }
.frequency-monthly { background: linear-gradient(135deg, #f59e0b, #d97706); }
.frequency-once { background: linear-gradient(135deg, #6b7280, #4b5563); }

/* Bar Content Layout */
.bar-content {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
}
.info-container{
  width: 40%;
  display: flex;
  justify-content: space-between;
}
.caregiver-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.action-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3rem;
}
.avatar-container {
  position: relative;
}

.caregiver-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
}

.caregiver-avatar:hover {
  border-color: rgba(102, 126, 234, 0.4);
  transform: scale(1.05);
}

.avatar-status {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 3px solid white;
}

.avatar-status.status-pending { background: #f59e0b; }
.avatar-status.status-realized { background: #10b981; }
.avatar-status.status-cancelled { background: #ef4444; }

.caregiver-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.caregiver-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.caregiver-specialty {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.details-section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.95rem;
  color: #4b5563;
  font-weight: 500;
}

.detail-item.frequency-detail {
  color: #667eea;
  font-weight: 600;
}

.detail-icon {
  width: 18px;
  height: 18px;
  fill: #9ca3af;
  flex-shrink: 0;
}

.frequency-detail .detail-icon {
  fill: #667eea;
}

.status-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.status-badge {
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.status-pending {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: none;
  cursor: default;
  border: none;
  opacity: 0.95;
  pointer-events: none;
}

.status-confirmed {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;

  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: none;
  cursor: default;
  border: none;
  opacity: 0.95;
  pointer-events: none;
}

.status-cancelled {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: none;
  cursor: default;
  border: none;
  opacity: 0.95;
  pointer-events: none;
}

.actions-section {
  display: flex;
  gap: 0.8rem;
}

.action-btn {
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.edit-btn {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
}

.cancel-btn {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.cancel-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
}

.btn-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

/* Edit Mode */
.edit-content {
  animation: slideIn 0.4s ease;
}

.edit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.edit-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.small-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #667eea;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
}

.form-input {
  padding: 0.8rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.save-btn {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  min-width: 140px;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
}

.cancel-edit-btn {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: white;
  min-width: 100px;
}

.cancel-edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(107, 114, 128, 0.4);
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reservation-bar {
  animation: fadeInUp 0.6s ease forwards;
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

/* Responsive Design */
@media (max-width: 1200px) {
  .bar-content {
    grid-template-columns: 240px 1fr 120px 160px;
  }
}

@media (max-width: 992px) {
  .bar-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .caregiver-section {
    justify-content: flex-start;
  }

  .details-section {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem 2rem;
  }

  .status-section,
  .actions-section {
    justify-content: flex-end;
  }
}

@media (max-width: 768px) {
  .reservations-app {
    padding: 1rem 0.5rem;
  }

  .reservations-title {
    font-size: 2.2rem;
  }

  .reservation-bar {
    padding: 1.2rem;
    margin: 0 0.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .details-section {
    flex-direction: column;
    gap: 0.8rem;
  }
}

@media (max-width: 480px) {
  .actions-section {
    flex-direction: column;
  }

  .action-btn {
    justify-content: center;
  }
}
</style>