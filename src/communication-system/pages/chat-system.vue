<script setup>

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

    <!-- Mensaje principal -->
    <div class="message-block">
      <div class="message-meta">January 11th 2024, 12:12 AM</div>
      <div class="message-content">
        <div class="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.
        </div>
        <img src="/src/assets/profile3.jpg" alt="Profile" class="profile-image" />
      </div>
    </div>

    <!-- Input de mensaje -->
    <div class="message-input">
      <input type="text" placeholder="Send a message..." />
      <button>
        ✈️ Send
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
}
</script>

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