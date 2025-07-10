
<!-- Falta implementar -->
<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'ProfileView',
  components: {
    ParentProfile: defineAsyncComponent(() => import('./ParentProfile.vue')),
    BabysitterProfile: defineAsyncComponent(() => import('./BabysitterProfile.vue')),
  },
  data() {
    return {
      role: null
    };
  },
  created() {
    try {
      const userData = JSON.parse(localStorage.getItem('user')); // O usa Pinia si lo deseas
      if (userData?.role) {
        this.role = userData.role.toLowerCase();
      }
    } catch (e) {
      console.error('Error leyendo el rol del usuario:', e);
    }
  }
};
</script>

<template>
  <div>
    <ParentProfile v-if="role === 'parent'" />
    <BabysitterProfile v-else-if="role === 'babysitter'" />
    <p v-else>Unknown user role</p>
  </div>
</template>
