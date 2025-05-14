<script setup>
import {defineComponent, ref, watch} from 'vue'
import Select from 'primevue/select';


const props = defineProps(['locations', 'ratings'])

const loc = ref(null)
const rate = ref(null)
</script>

<template>
  <div class="flex align-items-center gap-3 flex-wrap">
    <div>
      <label class="block">Location</label>
      <Select :options="locations" v-model="loc" @change="$emit('locationChange', loc)" />
    </div>
    <div>
      <label class="block">Rating</label>
      <Select :options="ratings" v-model="rate" @change="$emit('ratingChange', rate)" />
    </div>
    <pv-button label="Refresh" @click="$emit('refresh')" />
  </div>
</template>

<style scoped>

</style>