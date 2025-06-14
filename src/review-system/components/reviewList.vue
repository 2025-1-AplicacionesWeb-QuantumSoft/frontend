<script>
import ReviewItem from "./reviewItem.vue";

export default {
  name: 'review-list',
  components: {
    ReviewItem
  },
  props: {
    reviews: { type: Array, required: true }
  }
}
</script>

<template>
  <div class="review-list">
    <div v-for="review in reviews" :key="review.id" class="review-item-wrapper">
      <ReviewItem :profile="review" />
    </div>
  </div>
</template>

<style scoped>
.review-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 20px;
  justify-content: flex-start;
  padding: 20px;
  background-color: var(--color-primary);
  border-radius: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  height: 80%;
  min-height: 80%;
  max-width: 90vw;
  overflow-x: auto;
  box-sizing: border-box;
}

.review-item-wrapper {
  flex: 0 0 300px;
  max-width: 300px;
}
</style>