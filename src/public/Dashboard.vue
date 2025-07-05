<script setup lang="ts">

</script>

<template>
  <body>
  <div class="dashboard">
    <div class="card card-premium">
      <h2>Plan Premium</h2>
      <p>Acceso completo a todas las funciones y soporte dedicado para familias y niñeras.</p>
      <p class="price">$9.99 / mes</p>
      <router-link to="/">
        <button>Más información</button>
      </router-link>
    </div>

    <div class="card card-search">
      <h2>Buscar Niñera</h2>
      <p>Encuentra cuidadoras disponibles según tus necesidades.</p>
      <router-link to="/babysitters">
      <a href="#">Buscar ahora</a>
      </router-link>
    </div>

    <router-link to="/reservation-list">
    <div class="card card-reservas">
      <h2>Mis Reservas</h2>
      <p>Revisa tus próximas sesiones agendadas.</p>
      <span class="resumen">3 próximas esta semana</span>
    </div>
    </router-link>

    <div class="card card-mensajes">
      <h2>Mensajes</h2>
      <p>Habla con niñeras o familias de forma directa y segura.</p>
      <router-link to="/chat">
      <a href="#">Ir a mensajería</a>
      </router-link>
    </div>
    <router-link to="/reviews">
    <div class="card card-reviews">
      <h2>Reseñas</h2>
      <p>Lee y escribe reseñas sobre la experiencia con niñeras.</p>
      <div class="score">⭐ 4.8 / 5</div>
    </div>
    </router-link>

    <router-link to="/babysitter-profile">
    <div class="card card-perfil">
      <h2>Mi Perfil</h2>
      <p>Actualiza tu disponibilidad, tarifas y más.</p>
      <a href="#">Editar perfil</a>
    </div>
    </router-link>

  </div>
  </body>
</template>

<style scoped>
body {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;

}

.dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 20px;
  max-width: 1400px;
  width: 96vw;
  margin: -20px auto;
  padding: 10px 20px;
  background: rgba(255,255,255,0.7);
  border-radius: 2.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  border: 1.5px solid #e3e8ee;
}

.card {
  border-radius: 12px;
  padding: 36px 28px 28px 28px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.10);
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1.5px solid #e3e8ee;
  min-height: 250px;
  transition: box-shadow 0.2s, transform 0.2s;
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: -40px; left: -40px;
  width: 120px; height: 120px;
  background: rgba(0,0,0,0.03);
  border-radius: 50%;
  z-index: 0;
}

.card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.13);
  transform: translateY(-2px) scale(1.02);
}

.card h2 {
  font-size: 1.5rem;
  margin-bottom: 16px;
  z-index: 1;
  position: relative;
}

.card p {
  margin-bottom: 16px;
  line-height: 1.6;
  z-index: 1;
  position: relative;
}

.card a, .card button {
  margin-top: auto;
  z-index: 1;
  position: relative;
}

.card a {
  color: var(--color-blue-accent);
  text-decoration: underline;
  font-weight: bold;
  display: inline-block;
}

.card button {
  background: white;
  color: var(--color-pink);
  border: 2px solid var(--color-pink);
  border-radius: 8px;
  padding: 12px 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.card button:hover {
  background: var(--color-blue-accent);
  color: white;
}

.card-premium {
  background: var(--color-pink);
  color: white;
  border: none;
  grid-row: 1 / 1;
  grid-column: 1 / 3;
}

.card-premium .price {
  font-size: 1.2rem;
  font-weight: bold;
}

.card-search {
  background: var(--color-blue-light);
  color: var(--color-blue-dark);
  grid-row: 2 / 3;
  grid-column: 2 / 4;
}

.card-reservas {
  background: var(--color-cream-light);
  color: var(--color-blue-dark);
  grid-row: 1 / 2;
  grid-column: 3 / 4;
}

.card-reservas .resumen {
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-blue-accent);
}

.card-mensajes {
  border-left: 6px solid var(--color-blue-accent);
  background: white;
  grid-row: 2 / 4;
  grid-column: 1 / 2;
}

.card-reviews {
  background: var(--color-primary);
  color: white;
  grid-row: 3 / 4;
  grid-column: 2 / 3;
}

.card-reviews .score {
  font-weight: bold;
  font-size: 1.15rem;
  margin-top: 10px;
}

.card-perfil {
  background: var(--color-blue-accent);
  color: white;
  grid-area: 4 / 3 / 3 / 4;
}

@media (max-width: 900px) {
  .dashboard {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
    padding: 20px 8px;
    border-radius: 1.5rem;
  }
  .card {
    padding: 24px 14px 18px 14px;
    min-height: 180px;
  }
}
</style>