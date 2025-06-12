<script>

  import {UserApiService} from "@/auth/services/user-api.service.js";

  export  default {
    name: 'log-in',
    data(){
      return {
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "",
        created_at: "",
        updated_at: "",
        errorMessage: ""
      }
    },
    methods:{
      async handleLogin() {
        try {
          const userApiService = new UserApiService();
          const userData =  await userApiService.login(this.email, this.password);
          const user= userData ? userData : null;
          if(user){
            if(user.role == "babysitter"){
              console.log("Ninera", user);
              this.$router.push({path:"/babysitter-profile"});
            }else {
              console.log("Padre", user);
              this.$router.push({path:"/reservation-list"});
            }

          }else {
            this.errorMessage = "Correo o contraseña incorrectos.";
          }
        }catch(err){
          console.log(err);
          this.errorMessage = err.message || "Hubo un error al intentar iniciar sesion";
        }
      },
    }
  }
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-card-header">
        <img src="./../../assets/logo.png" class="logo">
      </div>
      <form @submit.prevent="handleLogin">
        <div class="p-field">
          <label for="email">Email</label>
          <pv-inputText
            id="email"
            type="email"
            v-model="email"
            class="p-inputText p-component"
            placeholder="example@gmail.com"
            required
          />
        </div>
        <div class="p-field">
          <label for="password">Password</label>
          <pv-inputText
              id="password"
              type="password"
              v-model="password"
              class="p-inputText p-component"
              placeholder="********"
              required
            />
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
          <a href="#">Create a new one</a>
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
  background-color: #f4f2f2;
}

.login-card {
  background-color: #3c4b64;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.logo {
  width: 80px;
  height: auto;
  margin-bottom: 1rem;
}

h2 {
  color: #fff;
  font-size: 24px;
}

.p-field {
  margin-bottom: 1rem;
}

.p-inputText {
  width: 100%;
  padding: 0.5rem;
}

.p-button {
  width: 48%;
  margin-top: 1rem;
}

.p-d-flex {
  gap: 1rem;
}

.register-link {
  color: #fff;
  font-size: 14px;
  margin-top: 1rem;
}

a {
  color: #00aaff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>