<script>
import Sidebar from '@/public/Sidebar.vue'
import { ref, onMounted } from 'vue';
import RegistrationService from "@/registration-services/component/RegistrationService.vue";
import { BabysitterService } from "@/registration-services/service/registration.service.js";

export default {
  name: "babysitter-profile",
  components: {
    RegistrationService,
  },
  setup() {
    const babysitter = ref(null);
    const editable = ref({});
    const editing = ref({});
    const showNewCard = ref(false);

    onMounted(async () => {
      const data = await BabysitterService.getBabysitters();
      babysitter.value = data.length > 0 ? data[0] : null;
      editable.value = { ...babysitter.value };
    });

    function toggleEdit(field) {
      editing.value[field] = !editing.value[field];
    }

    function updateProfile() {
      babysitter.value = { ...editable.value };
      showNewCard.value = true;
    }

    return {
      babysitter,
      editable,
      editing,
      toggleEdit,
      updateProfile,
      showNewCard,
    };
  },
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
        <h4 class="biography-section">Biography</h4>
        <p>{{ babysitter.description }}</p>
      </section>
      <section>
        <h4 class="about-section">About</h4>
        <p>{{ babysitter.about }}</p>
      </section>

      <form class="profile-form">
        <div v-for="field in ['name','email','phone','location','experience','lastname','updateP','confirmP','rating']" :key="field" class="form-group">
          <label>{{ field.charAt(0).toUpperCase() + field.slice(1) }}</label>
          <div class="input-icon-group">
            <input
                :type="field.includes('email') ? 'email' : 'text'"
                v-model="editable[field]"
                :disabled="!editing[field]"
            />
            <i class="pi pi-pencil edit-icon" @click="toggleEdit(field)"></i>
          </div>
        </div>
      </form>

      <div style="margin-top: 1.5rem; text-align: right;">
        <button type="button" class="update-btn" @click="updateProfile">Update</button>
      </div>
    </template>
  </pv-card>

  <pv-card v-if="showNewCard">
    <template #header>
      <h3>Updated Profile</h3>
    </template>
    <template #content>
      <p><strong>Name:</strong> {{ babysitter.name }}</p>
      <p><strong>Email:</strong> {{ babysitter.email }}</p>
      <p><strong>Phone:</strong> {{ babysitter.phone }}</p>
      <p><strong>Location:</strong> {{ babysitter.location }}</p>
      <p><strong>Experience:</strong> {{ babysitter.experience }} años</p>
      <p><strong>Lastname:</strong> {{ babysitter.lastname }}</p>
      <p><strong>Update Password:</strong> {{ babysitter.updateP }}</p>
      <p><strong>Confirm Password:</strong> {{ babysitter.confirmP }}</p>
      <p><strong>Rating:</strong> {{ babysitter.rating }}</p>
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
  margin-bottom: 0.5rem;
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

.update-btn {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.update-btn:hover {
  background-color: #2980b9;
}

.edit-icon {
  margin-left: 0.4rem;
  color: #888;
  font-size: 1rem;
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.2s, background 0.2s, transform 0.2s;
  border-radius: 50%;
}
.edit-icon:hover {
  color: #3498db;
  background: #eaf4fb;
  transform: scale(1.15);
}

.about-section {
  margin-top: 2.5rem;
}

.biography-section {
  margin-top: 2.5rem;
}
</style>
