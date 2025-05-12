<script setup>
import { ref, watch } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

const props = defineProps(['locations', 'ratings'])
const loc = ref(null)
const rate = ref(null)
</script>

<template>
  <div class="flex align-items-center gap-3 flex-wrap">
    <div>
      <label class="block">Location</label>
      <Dropdown :options="locations" v-model="loc" @change="$emit('locationChange', loc)" />
    </div>
    <div>
      <label class="block">Rating</label>
      <Dropdown :options="ratings" v-model="rate" @change="$emit('ratingChange', rate)" />
    </div>
    <Button label="Refresh" @click="$emit('refresh')" />
  </div>
</template>

<style scoped>

</style>