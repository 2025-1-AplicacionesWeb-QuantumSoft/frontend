<script>
import { ref, computed, onMounted } from 'vue';
import { useAuthenticationStore } from "@/iam/services/authentication.store.js";
import { ParentService, BabysitterService } from "@/registration-services/service/registration.service.js";

export default {
  name: "parent-profile",
  setup() {
    const authStore = useAuthenticationStore();
    const currentRole = authStore.currentRole;
    const parentId = authStore.currentUserId;

    const profile = ref(null);
    const editable = ref({});
    const editing = ref({});
    const fields = computed(() => {
      return currentRole === 'parent'
          ? ['name', 'phone', 'address', 'city', 'childrenCount', 'preferences']
          : ['name', 'phone', 'description', 'languages', 'rating', 'location', 'accountBank', 'bankName', 'typeAccountBank', 'dni', 'experienceLevel'];
    });
    const showNewCard = ref(false);

    onMounted(async () => {
      try {
        if (currentRole === 'parent') {
          const data = await ParentService.getParentByUserId(parentId);
          profile.value = data;
          editable.value = { ...data };

        } else if (currentRole === 'babysitter') {
          const data = await BabysitterService.getBabysitterByUserId(parentId);
          profile.value = data;
          editable.value = { ...data };
        }
      } catch (e) {
        console.error("Error loading profile:", e);
      }
    });

    function toggleEdit(field) {
      editing.value[field] = !editing.value[field];
    }

    async function updateProfile() {
      try {
        if (currentRole === 'parent') {
          await ParentService.UpdateParent(editable.value);
        } else if (currentRole === 'babysitter') {
          await BabysitterService.UpdateBabysitter(editable.value);
        }
        profile.value = { ...editable.value };
        showNewCard.value = true;
      } catch (e) {
        console.error("Error updating profile:", e);
      }
    }

    return {
      currentRole,
      profile,
      editable,
      editing,
      showNewCard,
      toggleEdit,
      updateProfile,
      fields
    };
  }
}
</script>



<template>
  <div class="profile-bg">
    <pv-card v-if="profile" class="profile-card">
      <template #header>
        <div class="header-content">
          <img
              src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              alt="User Avatar"
              class="avatar"
          />
          <div>
            <h2 class="profile-title">
              {{ currentRole === 'parent' ? 'Perfil del Tutor' : 'Perfil de Niñera' }}
            </h2>
            <p class="subtitle">Edita y actualiza tu información</p>
          </div>
        </div>
      </template>

      <template #content>
        <form class="profile-form">
          <div v-for="field in fields" :key="field" class="form-group">
            <label>{{ field.charAt(0).toUpperCase() + field.slice(1) }}</label>
            <div class="input-icon-group">
              <input
                  :type="field === 'childrenCount' || field === 'rating' ? 'number' : 'text'"
                  v-model="editable[field]"
                  :disabled="!editing[field]"
                  :min="field === 'rating' ? 0 : undefined"
                  :max="field === 'rating' ? 5 : undefined"
                  :step="field === 'rating' ? 0.1 : undefined"
              />
              <i class="pi pi-pencil edit-icon" @click="toggleEdit(field)"></i>
            </div>
          </div>
        </form>
        <div class="button-container">
          <button type="button" class="update-btn" @click="updateProfile">Actualizar</button>
        </div>
      </template>
    </pv-card>

    <pv-card v-if="showNewCard" class="updated-card">
      <template #header>
        <h3>Perfil Actualizado</h3>
      </template>
      <template #content>
        <ul class="updated-list">
          <li v-for="field in fields" :key="field">
            <strong>{{ field.charAt(0).toUpperCase() + field.slice(1) }}:</strong> {{ profile[field] }}
          </li>
        </ul>
      </template>
    </pv-card>
  </div>
</template>




<style scoped>
.profile-bg {
  height: 100vh;
  background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

}
.profile-card, .updated-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  padding: 2.5rem 2rem 2rem 2rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 480px;
  transition: box-shadow 0.2s;
  flex: 1;
  overflow-y: scroll;
}
.profile-card:hover {
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.22);
}
.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}
.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(52, 152, 219, 0.15);
  border: 3px solid #eaf6fb;
  object-fit: cover;
}
.profile-title {
  font-size: 1.7rem;
  color: #34495e;
  margin: 0;
  font-weight: 700;
}
.subtitle {
  color: #7f8c8d;
  font-size: 1rem;
  margin: 0.2rem 0 0 0;
}
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1rem;
}
.form-group {
  background: #f7fbff;
  border-radius: 10px;
  padding: 1rem 1.2rem;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.05);
  display: flex;
  flex-direction: column;
}
label {
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #2980b9;
  font-size: 0.98rem;
}
.input-icon-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
input {
  flex: 1;
  padding: 0.6rem 1rem;
  border: 1.5px solid #d6eaff;
  border-radius: 8px;
  background-color: #fafdff;
  color: #34495e;
  font-size: 1rem;
  transition: border 0.2s;
}
input:focus {
  border-color: #3498db;
  outline: none;
  background: #f0f8ff;
}
.update-btn {
  background: linear-gradient(90deg, #3498db 0%, #6dd5fa 100%);
  color: #fff;
  border: none;
  padding: 0.9rem 2.2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.5rem;
  box-shadow: 0 4px 16px rgba(52, 152, 219, 0.13);
  transition: background 0.2s, transform 0.2s;
}
.update-btn:hover {
  background: linear-gradient(90deg, #2980b9 0%, #57c1eb 100%);
  transform: translateY(-2px) scale(1.03);
}
.edit-icon {
  margin-left: 0.4rem;
  color: #888;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 50%;
  padding: 0.3rem;
  transition: color 0.2s, background 0.2s, transform 0.2s;
}
.edit-icon:hover {
  color: #3498db;
  background: #eaf4fb;
  transform: scale(1.15);
}
.button-container {
  display: flex;
  justify-content: flex-end;
}
.updated-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.updated-list li {
  margin-bottom: 0.7rem;
  font-size: 1.05rem;
  color: #34495e;
}
@media (max-width: 600px) {
  .profile-card, .updated-card {
    padding: 1.2rem 0.5rem;
    max-width: 98vw;
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .header-content {
    flex-direction: column;
    gap: 0.7rem;
    text-align: center;
  }
}
</style>