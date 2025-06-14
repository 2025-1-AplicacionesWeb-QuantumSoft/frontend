<script>
import Sidebar from '@/public/Sidebar.vue';
import { ref, onMounted } from 'vue';
import ReviewItem from '@/review-system/components/reviewItem.vue';
import ReviewList from '@/review-system/components/reviewList.vue';
import { ReviewApiService } from '@/review-system/service/review.service.js';

export default {
  name: 'review-management',
  components: {
    Sidebar,
    ReviewItem,
    ReviewList
  },
  setup() {
    const reviews = ref([]);
    const reviewService = new ReviewApiService([]);
    onMounted(async () => {
      try {
        reviews.value = await reviewService.getReviews();
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    });

    return {
      reviews
    };
  }
};
</script>

<template>
  <Sidebar />
  <ReviewList :reviews="reviews" />
</template>

<style scoped>
.review-card {
  background-color: var(--color-primary);
  border-radius: 1rem;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 1.5rem;
  margin: 1rem 0;
}
.form-grid label {
  color: #fff;
  font-weight: bold;
  margin-top: 1rem;
  display: block;
}
.form-grid input,
.form-grid textarea {
  width: 100%;
  border-radius: 0.5rem;
  border: none;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #222;
  color: #fff;
  resize: none;
}
.form-grid input[disabled],
.form-grid textarea[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
