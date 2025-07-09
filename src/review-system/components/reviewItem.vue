<script>
import ReviewItem from "./reviewItem.vue";

export default {
  name: 'review-list',
  components: {
    ReviewItem
  },
  props: {
    reviews: { type: Array, required: true }
  },
  computed: {
    normalizedReviews() {
      return this.reviews.map(r => ({
        Id: Number(r.Id ?? r.id ?? 0),
        ParentId: Number(r.ParentId ?? r.parentId ?? 0),
        BabysitterId: Number(r.BabysitterId ?? r.babysitterId ?? 0),
        comment: r.comment || '',
        rating: Number(r.rating || 0),
        date: r.date || ''
      }));
    }
  }
}
</script>

<template>
  <div class="review-list">
    <div v-for="review in normalizedReviews" :key="review.Id" class="review-item-wrapper">
      <ReviewItem :profile="review" />
    </div>
  </div>
</template>

<style scoped>
.review-list {
  display: flex;
  overflow-x: scroll;
  gap: 20px;
  padding: 20px;
  background-color: var(--color-primary);
  border-radius: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  height: 100%;
  max-width: 90vw;
  box-sizing: border-box;
}

.review-item-wrapper {
  flex: 0 0 300px;
  max-width: 300px;
}
</style>