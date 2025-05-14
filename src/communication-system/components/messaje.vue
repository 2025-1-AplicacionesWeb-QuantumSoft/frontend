<script setup>
defineProps({
  content: String,
  sentAt: String,
  userId: Number,
});
</script>

<template>
  <div class="message-block">
    <div class="message-meta">{{ sentAt }}</div>
    <div class="message-content">
      <div class="text">{{ content }}</div>
      <img :src="`/src/assets/profile${userId}.jpg`" alt="Profile" class="profile-image" />
    </div>
  </div>
</template>

<style scoped>
/* igual que el actual */
.message-block {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
}
.message-meta {
  font-size: 14px;
  color: gray;
  margin-bottom: 8px;
}
.message-content {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}
.message-content .text {
  flex: 1;
  color: #000;
}
.profile-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
