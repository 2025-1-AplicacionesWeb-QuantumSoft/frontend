<script setup>
import { ref } from 'vue'

const isHovered = ref(false)

</script>

<template>
  <div
      class="sidebar flex flex-column m-1 max-h-30rem align-items-center border-2 border-round-xl justify-content-between min-h-screen shadow-2 transition-all transition-duration-200"
      :class="[isHovered ? 'w-13rem' : 'w-4rem']"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
  >
    <div>
      <div class="px-3 pt-3 w-5rem flex align-items-center">
        <img src="@/assets/logo.png" alt="">
      <div class="text-xl font-bold mb-5 px-3 pt-3" v-if="isHovered">KindyCare</div>

      </div>

      <ul class="list-none p-3">
        <router-link to="/babysitter-profile">
        <li class="mb-3 ml-2 p-2 flex align-items-center">

            <i class="pi pi-users mr-2 text-pink-500 "></i>
            <span v-if="isHovered">Babysitters</span>
        </li>
        </router-link>

        <li class="mb-3 ml-2 p-2 flex align-items-center">
          <i class="pi pi-calendar mr-2"></i>
          <span v-if="isHovered">My Reservations</span>
        </li>
        <li class="mb-3 ml-2 p-2 flex align-items-center">
          <i class="pi pi-comments mr-2"></i>
          <span v-if="isHovered">Messages</span>
          <span v-if="isHovered" class="ml-2 p-tag">3</span>
        </li>
        <li class="mb-3 ml-2 p-2 flex align-items-center">
          <i class="pi pi-cog mr-2"></i>
          <span v-if="isHovered">Settings</span>
        </li>
        <li class="mb-3 ml-2 p-2 flex align-items-center">
          <i class="pi pi-star mr-2"></i>
          <span v-if="isHovered">My Reviews</span>
        </li>
      </ul>
    </div>
  <div class="flex justify-content-center align-items-center mb-3">
    <img
        src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        alt="User Avatar"
        class="border-circle w-3rem h-3rem"
    />
    <div class="ml-2" v-if="isHovered">
      <h4 class="text-900 font-bold mb-0">Amy</h4>
      <p class="text-500 mb-0">
        <i class="pi pi-map-marker mr-1"></i>
        <span>Lima</span>
      </p>
    </div>
  </div>
  </div>
</template>

<style scoped>
 .transition-all {
   transition: all 0.2s ease-in-out;
 }
 .sidebar{
   background-color: var(--color-primary);
 }
</style>