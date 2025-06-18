<script setup>
import {onMounted, ref} from 'vue';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import {BabysitterService, ReservationService} from "@/reservations/service/reservation.service.js";

const reservation = ref([])
const babysitters = ref([])

onMounted(async ()=>{
  try {
    reservation.value = await ReservationService.getReservationById(1);
    babysitters.value = await BabysitterService.getBabysitters();
    console.log(reservation.value)
    console.log(babysitters.value)
  } catch (error) {
    console.error('Error al obtener reservas:', error)
  }
})

const reservations = ref([
  {
    caregiver: 'John Doe',
    location: 'Location',
    date: 'January 1th, 2024',
    time: 'From 9AM to 5PM (8 hours)',
    fair: 40,
    status: 'Pending',
    image: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    caregiver: 'John Doe',
    location: 'Location',
    date: 'January 1th, 2024',
    time: 'From 9AM to 5PM (8 hours)',
    fair: 40,
    status: 'Realized',
    image: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    caregiver: 'John Doe',
    location: 'Location',
    date: 'January 1th, 2024',
    time: 'From 9AM to 5PM (8 hours)',
    fair: 40,
    status: 'Cancelled',
    image: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    caregiver: 'Julio Cesar',
    location: 'Location',
    date: 'January 1th, 2024',
    time: 'From 9AM to 5PM (8 hours)',
    fair: 40,
    status: 'Realized',
    image: 'https://randomuser.me/api/portraits/men/5.jpg'
  }
]);

const getStatusSeverity = (status) => {
  switch (status) {
    case 'Pending': return 'warning';
    case 'Realized': return 'success';
    case 'Cancelled': return 'danger';
    default: return 'info';
  }
};
</script>

<template>
  <div class="reservations-container">
    <h2>Reservations</h2>

    <div v-for="(reservation, index) in reservations" :key="index" class="reservation-card">
      <div class="card-content">
        <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="Caregiver photo" class="avatar" />

        <div class="info">
          <p><strong>Caregiver:</strong> {{ reservation.caregiver }}</p>
          <p><strong>Work location:</strong> {{ reservation.location }}</p>
          <p><strong>Reservation date:</strong> {{ reservation.date }}</p>
          <p><strong>Total timework:</strong> {{ reservation.time }}</p>
          <p><strong>Total fair:</strong> S/ {{ reservation.fair.toFixed(2) }}</p>
        </div>

        <div class="status-section">
          <Tag :value="reservation.status" :severity="getStatusSeverity(reservation.status)" class="mb-2" />

          <div v-if="reservation.status === 'Pending'" class="action-buttons">
            <Button label="Update" class="p-button-sm p-button-primary mb-2 w-full" />
            <Button label="Cancel" class="p-button-sm p-button-secondary w-full" outlined />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reservations-container {
  background-color: #f3d6c8;
  padding: 2rem;
  min-height: 100vh;
}

h2 {
  margin-bottom: 1.5rem;
}

.reservation-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
  padding: 1rem;
}

.card-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 9999px;
  object-fit: cover;
}

.info {
  flex-grow: 1;
  font-size: 0.95rem;
  color: #1f2937; /* text-gray-800 */
}

.status-section {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.action-buttons {
  margin-top: 0.5rem;
  width: 100px;
}
</style>