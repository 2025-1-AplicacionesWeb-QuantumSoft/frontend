<script>

  export  default {
    name: 'log-in',
    data(){
      return {
        email: '',
        password: '',
        users: {
          parent: {
            id: 5,
            name: "María Sánchez",
            email: "maria.sanchez@email.com",
            password: "hashed_password_5",
            phone: "+34600567890",
            role: "parent",
            created_at: "2024-10-05",
            updated_at: "2024-10-05"
          },
          babysitter: {
            id: 6,
            name: "Lucía Fernández",
            email: "lucia.fernandez@email.com",
            password: "hashed_password_6",
            phone: "+34600678901",
            role: "babysitter",
            created_at: "2024-10-06",
            updated_at: "2024-10-06"
          }
        }
      }
    },
    methods:{
      handleNiñera() {
        const user = this.users.babysitter;
        window.localStorage.setItem('user', JSON.stringify(user));
        this.$router.push(`/babysitter-profile/${user.id}`);
      },
      handlePadre() {
        const user = this.users.parent;
        window.localStorage.setItem('user', JSON.stringify(user));
        this.$router.push(`/payment/${user.id}`);
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
      <form @submit.prevent="handleSubmit">
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
              type="button"
              label="Niñera"
              class="p-button p-button-success"
              @click="handleNiñera"
          />
          <pv-button
              type="button"
              label="Padre"
              class="p-button p-button-primary"
              @click="handlePadre"
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