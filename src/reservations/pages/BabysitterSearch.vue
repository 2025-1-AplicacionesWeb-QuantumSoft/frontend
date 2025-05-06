<script setup>
import Sidebar from '@/public/Sidebar.vue'
import FiltersBar from '@/reservations/components/FiltersBar.vue'
import BabysitterCard from '@/reservations/components/BabysitterCard.vue'
import {getBabysitters} from "@/reservations/service/reservation.service.js";

import {ref, computed, onMounted} from 'vue'

const babysitters = ref([])
const selectedLocation = ref(null)
const selectedRating = ref(null)

const locations = ['Lima', 'Cusco', 'Arequipa']
const ratings = [5, 4, 3, 2]

onMounted(async () => {
  try {
    const response = await getBabysitters()
    babysitters.value = response.data
  } catch (error) {
    console.error('Error al obtener reservas:', error)
  }
})
const setLocation = (loc) => (selectedLocation.value = loc)
const setRating = (rate) => (selectedRating.value = rate)
const resetFilters = () => {
  selectedLocation.value = null
  selectedRating.value = null
}

const filteredBabysitters = computed(() => {
  return babysitters.value.filter((s) => {
    return (!selectedLocation.value || s.location === selectedLocation.value) &&
        (!selectedRating.value || Math.floor(s.rating) === selectedRating.value)
  })
})
</script>

<template>
  <div class="container flex">

    <div class="flex-1 p-4">
      <FiltersBar
          :locations="locations"
          :ratings="ratings"
          @locationChange="setLocation"
          @ratingChange="setRating"
          @refresh="resetFilters"
      />

      <div class="grid mt-4">
        <BabysitterCard
            v-for="sitter in filteredBabysitters"
            :key="sitter.id"
            :sitter="sitter"
            class="col-12 md:col-4 lg:col-3"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--color-cream);
}
</style>