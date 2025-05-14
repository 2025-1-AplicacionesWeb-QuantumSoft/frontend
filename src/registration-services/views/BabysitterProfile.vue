<script>
import Sidebar from '@/public/Sidebar.vue'
import {ref, onMounted} from 'vue';
import RegistrationService from "@/registration-services/component/RegistrationService.vue";
import {getBabysitters} from "@/registration-services/service/registration.service.js";

export default {
  name: "babysitter-profile",
  components: {
    RegistrationService,
  },
  setup(){
    const babysitter = ref(null);
    onMounted(async () => {
      const data = await getBabysitters();
      babysitter.value = data.length > 0 ? data[0] : null;
    });
    return {
      babysitter,
    };
  }
}


</script>

<template>
  <pv-card v-if="babysitter">
    <template #header>
      <h3>Your Profile</h3>
    </template>

    <template #content>
      <img
          src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          alt="User Avatar"
          class="border-circle w-3rem h-3rem"
      />
      <section>
        <h4>Biography</h4>
        <p>{{ babysitter.description }}</p>
      </section>

      <form class="profile-form">
        <div class="form-group">
          <label>Name</label>
          <input type="text" :value="babysitter.name" disabled />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" :value="babysitter.email" disabled />
        </div>

        <div class="form-group">
          <label>Phone</label>
          <input type="text" :value="babysitter.phone" disabled />
        </div>

        <div class="form-group">
          <label>Location</label>
          <input type="text" :value="babysitter.location" disabled />
        </div>

        <div class="form-group">
          <label>Experience</label>
          <input type="text" :value="babysitter.experience + ' años'" disabled />
        </div>

        <div class="form-group">
          <label>Rating</label>
          <div class="rating">
            <span>⭐</span>
            <span>{{ babysitter.rating }}</span>
          </div>
        </div>
      </form>
    </template>
  </pv-card>
</template>

<style scoped>
h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}
h4 {
  font-size: 1.2rem;
  color: #34495e;
  margin-bottom: 1rem;
}
.profile-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
label {
  font-weight: bold;
  margin-bottom: 0.3rem;
}
input {
  padding: 0.5rem;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  background-color: #ecf0f1;
}
.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>