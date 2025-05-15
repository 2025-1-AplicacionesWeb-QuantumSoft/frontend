<script setup>
import ReviewItem from "./reviewItem.vue";
import {onMounted, ref} from "vue";
import {ReviewService} from "@/review-system/service/review.service.js";

const props = defineProps({
  reviews: { type: Array, required: true }
});
const reviews = ref([])

onMounted(async ()=>{
  try{
    reviews.value = await ReviewService.getReviews();
  } catch (error) {

  }
})
</script>

<template>
  <div class="review-list">
    <div v-for="review in reviews" :key="review.id" class="review-item-wrapper">
      <review-item :review="review" />
    </div>
  </div>
</template>

<style scoped>
.review-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  background-color: var(--color-primary);
  border-radius: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  height: 100%;
  min-height: 100%;
}

.review-item-wrapper {
  flex: 1 1 calc(30% - 20px);
  max-width: 300px;
}
</style>