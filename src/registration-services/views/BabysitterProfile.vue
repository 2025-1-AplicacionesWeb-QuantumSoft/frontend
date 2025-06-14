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
        <h4 class="biography-section">Biography</h4>
        <p>{{ babysitter.description }}</p>
      </section>
      <section >
        <h4 class="about-section">About</h4>
        <p>{{ babysitter.about }}</p>
      </section>

      <form class="profile-form">
        <div class="form-group">
          <label>Name</label>
          <div class="input-icon-group">
          <input type="text" :value="babysitter.name" disabled /><i class="pi pi-pencil edit-icon"></i>
          </div>
        </div>

        <div class="form-group">
          <label>Email</label>
          <div class="input-icon-group">
          <input type="email" :value="babysitter.email" disabled /><i class="pi pi-pencil edit-icon"></i>
          </div>
        </div>

        <div class="form-group">
          <label>Phone Number</label>
          <div class="input-icon-group">
          <input type="text" :value="babysitter.phone" disabled /><i class="pi pi-pencil edit-icon"></i>
          </div>
        </div>

        <div class="form-group">
          <label>Location</label>
          <div class="input-icon-group">
          <input type="text" :value="babysitter.location" disabled /><i class="pi pi-pencil edit-icon"></i>
          </div>
        </div>

        <div class="form-group">
          <label>Experience</label>
          <div class="input-icon-group">
          <input type="text" :value="babysitter.experience + ' años'" disabled /><i class="pi pi-pencil edit-icon"></i>
          </div>
        </div>

        <div class="form-group">
          <label>Lastname</label>
          <div class="input-icon-group">
          <input type="text" :value="babysitter.lastname " disabled /><i class="pi pi-pencil edit-icon"></i>
          </div>
        </div>

        <div class="form-group">
          <label>Update Password</label>
          <div class="input-icon-group">
          <input type="text" :value="babysitter.updateP " disabled /><i class="pi pi-pencil edit-icon"></i>
          </div>
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <div class="input-icon-group">
          <input type="text" :value="babysitter.confirmP " disabled /><i class="pi pi-pencil edit-icon"></i>
          </div>
        </div>

        <div class="form-group">
          <label>Rating</label>
          <div class="input-icon-group">
          <div class="rating">
            <span>⭐</span>
            <span>{{ babysitter.rating }}</span><i class="pi pi-pencil edit-icon"></i>
          </div>
          </div>
        </div>
      </form>
      <div style="margin-top: 1.5rem; text-align: right;">
        <button type="button" class="update-btn">Update</button>
      </div>
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