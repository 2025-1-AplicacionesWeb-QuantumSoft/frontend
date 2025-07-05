<script setup>
import { ref } from 'vue'
import authenticationSectionComponent from "@/iam/components/authentication-section.component.vue";
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
        <img src="@/assets/logo.png" alt="logo">
        <router-link to="/">
          <div class="text-xl font-bold mb-5 px-3 pt-3 logo-text" v-if="isHovered">KindyCare</div>
        </router-link>
      </div>

      <ul class="list-none p-3">
        <router-link to="/babysitters">
          <li class="sidebar-item mb-3 ml-2 p-2 flex align-items-center">
            <i class="pi pi-users mr-2 text-pink-500"></i>
            <span v-if="isHovered">Babysitters</span>
          </li>
        </router-link>
        <router-link to="/reservation-list">
          <li class="sidebar-item mb-3 ml-2 p-2 flex align-items-center">
            <i class="pi pi-calendar mr-2"></i>
            <span v-if="isHovered">My Reservations</span>
          </li>
        </router-link>
        <router-link to="/payment">
          <li class="sidebar-item mb-3 ml-2 p-2 flex align-items-center">
            <i class="pi pi-credit-card mr-2"></i>
            <span v-if="isHovered">Payments</span>
          </li>
        </router-link>
        <router-link to="/chat">
          <li class="sidebar-item mb-3 ml-2 p-2 flex align-items-center">
            <i class="pi pi-comments mr-2"></i>
            <span v-if="isHovered">Messages</span>
            <span v-if="isHovered" class="ml-2 p-tag message-badge">3</span>
          </li>
        </router-link>
        <li class="sidebar-item mb-3 ml-2 p-2 flex align-items-center">
          <i class="pi pi-star mr-2"></i>
          <router-link
              v-if="isHovered"
              to="/reviews"
              class="text-white"
              style="text-decoration: none"
          >
            My Reviews
          </router-link>
        </li>
      </ul>
    </div>
    <div class="user-section flex flex-column justify-content-center align-items-center mb-3">
      <div>
        <authentication-section-component :is-hovered="isHovered"/>
      </div>
      <div class="flex">
        <router-link to="/babysitter-profile">
          <img
              src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              alt="User Avatar"
              class="border-circle w-3rem h-3rem user-avatar"
          />
        </router-link>
        <div class="ml-2" v-if="isHovered">
          <h4 class="text-900 font-bold mb-0">Amy</h4>
          <p class="text-500 mb-0">
            <i class="pi pi-map-marker mr-1"></i>
            <span>Lima</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transition-all {
  transition: all 0.2s ease-in-out;
}

.sidebar {
  background-color: var(--color-primary);
}

.logo-text {
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.logo-text:hover {
  transform: scale(1.05);
  text-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.sidebar-item {
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.sidebar-item:hover i {
  transform: scale(1.2);
  transition: transform 0.3s ease;
}

.sidebar-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.sidebar-item:hover::before {
  transform: scaleY(1);
}

.message-badge {
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.user-section {
  transition: all 0.3s ease;
}

.user-section:hover {
  transform: scale(1.05);
}

.user-avatar {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.user-avatar:hover {
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transform: scale(1.1);
}

/* Efectos adicionales para los iconos */
.pi {
  transition: all 0.3s ease;
}

.sidebar-item:hover .pi {
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}
</style>

