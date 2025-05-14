<script setup>
import Messaje from "@/communication-system/components/messaje.vue";
</script>
<script>
export default {
  name: 'Chat',
}
</script>

<template>
  <div class="chat-container">
    <!-- Header -->
    <div class="chat-header">
      Chat online: <strong> Amy </strong>
    </div>

    <!-- Go Back Section -->
    <div class="go-back">
      <span class="icon">🡰</span>
      <span class="text"> Go back</span>
    </div>

    <!-- Mensajes principales -->
    <messaje></messaje>
    <messaje></messaje>
    <messaje></messaje>

    <!-- Input de mensaje -->
    <div class="message-input">
      <input type="text" placeholder="Send a message..." />
      <button>
        ✈️ Send
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  font-family: Arial, sans-serif;
  height: 100vh;
  color: black;
}

.chat-header {
  font-size: 20px;
  font-weight: bold;
}

.go-back {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  cursor: pointer;
}
.message-input {
  display: flex;
  gap: 10px;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  color: #000;
  background-color: #fff;
}

.message-input input::placeholder {
  color: #999;
}

.message-input button {
  background-color: #000;
  color: #fff;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>