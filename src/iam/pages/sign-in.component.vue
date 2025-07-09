<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignInRequest} from "../model/sign-in.request.js";

export default {
  name: "sign-in",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSignIn() {
      let authenticationStore = useAuthenticationStore();
      let signInRequest = new SignInRequest(this.username, this.password);
      authenticationStore.signIn(signInRequest, this.$router);
    }
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-card-header">
        <img src="./../../assets/logo.png" class="logo">
      </div>
      <form @submit.prevent="onSignIn">
        <div class="p-field">
          <label for="username">User Name</label>
          <pv-inputText
              id="username"
              v-model="username" :class="{'p-invalid': !username}"
              class="p-inputText p-component"
              placeholder="username"
              required
          />
          <small v-if="!username" class="p-invalid">Username is required.</small>
        </div>
        <div class="p-field">
          <label for="password">Password</label>
          <pv-inputText
              id="password"
              type="password"
              v-model="password" :class="{'p-invalid': !password}"
              class="p-inputText p-component"
              placeholder="********"
              required
          />
          <small v-if="!password" class="p-invalid">Password is required.</small>
        </div>
        <div class="p-d-flex p-jc-between">
          <pv-button
              type="submit"
              label="Log in"
              class="p-button p-button-success"
          />
        </div>
        <p class="register-link">
          Don't have an account?
          <router-link to="/sign-up">
            <span class="p-link">Create a new one</span>
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.login-container::before {
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

.login-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3rem 2.5rem;
  border-radius: 20px;
  box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  width: 100%;
  max-width: 420px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow:
      0 30px 60px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.15) inset;
}

.login-card::before {
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

.login-card-header {
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
  font-size: 1.5rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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
  background: linear-gradient(45deg, #00d4ff, #00a8cc);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 8px 20px rgba(0, 212, 255, 0.3);
}

.p-button:hover {
  background: linear-gradient(45deg, #00a8cc, #00d4ff);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 212, 255, 0.4);
}

.p-button:active {
  transform: translateY(0);
}

.register-link {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

a {
  color: #00d4ff;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

a:hover {
  color: #ffffff;
  text-shadow: 0 0 15px rgba(0, 212, 255, 0.8);
}

/* Responsive mejoras */
@media (max-width: 480px) {
  .login-container {
    padding: 1rem;
  }

  .login-card {
    padding: 2rem 1.5rem;
  }

  .logo {
    width: 70px;
  }
}

@supports (backdrop-filter: blur(20px)) {
  .login-card {
    background: rgba(255, 255, 255, 0.08);
  }
}
</style>