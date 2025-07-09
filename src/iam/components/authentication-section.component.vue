<script>
import {useRouter} from "vue-router";
import {useAuthenticationStore} from "../services/authentication.store.js";

export default {
  name: "authentication-section",
  props: {
    isHovered: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      router: useRouter(),
      authenticationStore: useAuthenticationStore()
    };
  },
  computed: {
    isSignedIn() {
      return this.authenticationStore.isSignedIn;
    },
    currentUsername() {
      return this.authenticationStore.currentUsername;
    },
  },
  methods: {
    onSignIn() {
      this.router.push({name: "sign-in"});
    },
    onSignUp() {
      this.router.push({name: "sign-up"});
    },
    onSignOut() {
      this.authenticationStore.signOut(this.router);
    }
  }
}
</script>

<template>
  <div class="auth-section">
    <div v-if="isSignedIn" class="auth-signed-in">
      <div class="welcome-message mb-2" v-if="isHovered">
        <i class="pi pi-user-check mr-2"></i>
        <span class="welcome-text" > Welcome {{ currentUsername }}</span>
      </div>
      <pv-button
          text
          class="auth-button sign-out-btn"
          @click="onSignOut"
      >
        <i class="pi pi-sign-out mr-2"></i>
        <span v-if="isHovered">Sign up</span>
      </pv-button>
    </div>
    <div v-else class="auth-signed-out">
      <pv-button
          text
          class="auth-button sign-in-btn mb-2"
          @click="onSignIn"
      >
        <i class="pi pi-sign-in mr-2"></i>
        Sign In
      </pv-button>
      <pv-button
          text
          class="auth-button sign-up-btn"
          @click="onSignUp"
      >
        <i class="pi pi-user-plus mr-2"></i>
        Sign Up
      </pv-button>
    </div>
  </div>
</template>

<style scoped>
.auth-section {
  padding: 1rem;
  width: 100%;
}

.auth-signed-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.auth-signed-out {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.welcome-message {
  width: 100%;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
}

.welcome-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.auth-button {
  width: 100%;
  padding: 0.6rem 1rem !important;
  border-radius: 20px !important;
  font-weight: 500 !important;
  font-size: 0.85rem !important;
  transition: all 0.3s ease !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px) !important;
  position: relative;
  overflow: hidden;
}

.auth-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.auth-button:hover::before {
  left: 100%;
}

.sign-in-btn {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.1)) !important;
  color: white !important;
  border-color: rgba(76, 175, 80, 0.3) !important;
}

.sign-in-btn:hover {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.3), rgba(76, 175, 80, 0.2)) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3) !important;
}

.sign-up-btn {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(33, 150, 243, 0.1)) !important;
  color: white !important;
  border-color: rgba(33, 150, 243, 0.3) !important;
}

.sign-up-btn:hover {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.3), rgba(33, 150, 243, 0.2)) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3) !important;
}

.sign-out-btn {
  background: linear-gradient(135deg, rgba(244, 67, 54, 0.2), rgba(244, 67, 54, 0.1)) !important;
  color: white !important;
  border-color: rgba(244, 67, 54, 0.3) !important;
}

.sign-out-btn:hover {
  background: linear-gradient(135deg, rgba(244, 67, 54, 0.3), rgba(244, 67, 54, 0.2)) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3) !important;
}

.auth-button:active {
  transform: translateY(0) !important;
}

.auth-section {
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-button {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
}

.auth-button i {
  transition: transform 0.3s ease;
}

.auth-button:hover i {
  transform: scale(1.1);
}
</style>