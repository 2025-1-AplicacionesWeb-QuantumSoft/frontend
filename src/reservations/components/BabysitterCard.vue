<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps(['babysitter'])
console.log(typeof props.babysitter.id)
const goToDetail = () => {
  router.push(`/babysitter/${props.babysitter.id}`)
}
</script>

<template>
  <div class="babysitter-card">
    <div class="card-image-container">
      <img :src="'https://randomuser.me/api/portraits/women/' + babysitter.id + '.jpg'" alt="Profile picture" class="card-image" />
    </div>
    <div class="card-content">
      <h3 class="card-name">{{ babysitter.name }}</h3>
      <p class="card-location">{{ babysitter.location }}</p>
      <p class="card-description">{{ babysitter.description }}</p>
      <div class="card-rating">
        <i class="pi pi-star-fill star-icon"></i>
        <span>{{ babysitter.rating }}</span>
      </div>
      <button class="card-button" @click="goToDetail">See more</button>
    </div>
  </div>
</template>

<style scoped>
.babysitter-card {
  width: 240px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  margin: 12px;
  display: flex;
  flex-direction: column;
}

.babysitter-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-image-container {
  width: 100%;
  height: 160px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e5ec;
}

.card-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.card-content {
  padding: 20px;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 12px 0 4px;
}

.card-location {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.card-location::before {
  content: "📍";
  font-size: 0.8rem;
}

.card-description {
  font-size: 0.85rem;
  color: #34495e;
  line-height: 1.4;
  margin-bottom: 16px;
  flex-grow: 1;
}

.card-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-bottom: 16px;
  font-weight: 500;
  color: #2c3e50;
}

.star-icon {
  color: #f1c40f;
  font-size: 1rem;
}

.card-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: center;
  width: 80%;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.card-button:hover {
  background-color: #2980b9;
  transform: translateY(-1px);
}

.card-button:active {
  transform: translateY(0);
}

.babysitter-card.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>