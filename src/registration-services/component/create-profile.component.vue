<script>
import { useAuthenticationStore } from "@/iam/services/authentication.store.js";
import { BabysitterService, ParentService } from "@/registration-services/service/registration.service.js";
import router from "@/router/index.js";

export default {
  name: "create-profile",
  data() {
    return {
      authenticationStore: useAuthenticationStore(),

      babysitterForm: {
        userId: 0,
        description: "",
        name: "",
        phone: "",
        languages: "",
        rating: 0,
        location: "",
        accountBank: "",
        bankName: "",
        typeAccountBank: "",
        dni: "",
        experienceLevel: ""
      },
      parentForm: {
        userId: 0,
        name: "",
        phone: "",
        address: "",
        childrenCount: 0,
        preferences: "",
        city: ""
      }
    };
  },
  computed: {
    role() {
      return this.authenticationStore.currentRole;
    },
    userId() {
      return this.authenticationStore.currentUserId;
    }
  },
  mounted() {
    if (this.role === "babysitter") this.babysitterForm.userId = this.userId;
    if (this.role === "parent") this.parentForm.userId = this.userId;
  },
  methods: {
    async submitProfile() {
      const payload = this.role === "babysitter" ? this.babysitterForm : this.parentForm;

      try {
        if (this.role === "babysitter") {
          await BabysitterService.createBabysitter(payload);
        } else if (this.role === "parent") {
          await ParentService.createParent(payload);
        } else {
          throw new Error("Unknown role");
        }

        alert("Profile created successfully!");
        router.push('/');
      } catch (error) {
        console.error("Error creating profile:", error);
        alert("Error creating profile. Please try again.");
      }
    }
  }
};
</script>


<template>
  <div class="signup-container">
    <div class="signup-card">
      <div class="signup-card-header">
        <img src="../../assets/logo.png" class="logo">
        <h2>Create {{ role === 'babysitter' ? 'Babysitter' : 'Parent' }} Profile</h2>
        <p class="subtitle">Please fill in your profile details.</p>
      </div>

      <form @submit.prevent="submitProfile">
        <template v-if="role === 'babysitter'">
          <div class="p-field" v-for="(value, key) in babysitterForm" v-if="key !== 'userId'" :key="key">
            <label :for="key">{{ key }}</label>
            <input
                :id="key"
                v-model="babysitterForm[key]"
                class="p-inputText p-component"
                :placeholder="`Enter ${key}`"
                :type="typeof value === 'number' ? 'number' : 'text'"
                required
            />
          </div>
        </template>

        <template v-else-if="role === 'parent'">
          <div class="p-field" v-for="(value, key) in parentForm" v-if="key !== 'userId'" :key="key">
            <label :for="key">{{ key }}</label>
            <input
                :id="key"
                v-model="parentForm[key]"
                class="p-inputText p-component"
                :placeholder="`Enter ${key}`"
                :type="typeof value === 'number' ? 'number' : 'text'"
                required
            />
          </div>
        </template>

        <div class="p-d-flex p-jc-between">
          <pv-button
              type="submit"
              label="Create Profile"
              class="p-button p-button-primary"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.signup-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.signup-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3rem 2.5rem;
  border-radius: 20px;
  box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  width: 100%;
  max-width: 450px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.signup-card:hover {
  transform: translateY(-5px);
  box-shadow:
      0 30px 60px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.15) inset;
}

.signup-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.05) 50%, transparent 70%);
  border-radius: 20px;
  pointer-events: none;
}

.signup-card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
}

.logo {
  width: 90px;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

h2 {
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  margin: 0;
}

.p-field {
  margin-bottom: 1.5rem;
  color: #ffffff;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #ffffff;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.p-inputText {
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.p-inputText::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.p-inputText:focus {
  outline: none;
  border-color: #00d4ff;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  transform: translateY(-2px);
}

.p-invalid {
  border-color: #ff6b9d !important;
  background-color: rgba(255, 107, 157, 0.1) !important;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

small.p-invalid {
  color: #ff6b9d;
  margin-top: 0.25rem;
  display: block;
  font-size: 0.8rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.p-d-flex {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.p-button {
  width: 100%;
  padding: 1rem;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 12px;
  border: none;
  background: linear-gradient(45deg, #ff6b9d, #c44569);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 8px 20px rgba(255, 107, 157, 0.3);
}

.p-button:hover {
  background: linear-gradient(45deg, #c44569, #ff6b9d);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(255, 107, 157, 0.4);
}

.p-button:active {
  transform: translateY(0);
}

.login-link {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

a {
  color: #ff6b9d;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(255, 107, 157, 0.5);
}

a:hover {
  color: #ffffff;
  text-shadow: 0 0 15px rgba(255, 107, 157, 0.8);
}

@media (max-width: 480px) {
  .signup-container {
    padding: 1rem;
  }

  .signup-card {
    padding: 2rem 1.5rem;
  }

  .logo {
    width: 70px;
  }

  h2 {
    font-size: 1.5rem;
  }
}

@supports (backdrop-filter: blur(20px)) {
  .signup-card {
    background: rgba(255, 255, 255, 0.08);
  }
}
</style>
