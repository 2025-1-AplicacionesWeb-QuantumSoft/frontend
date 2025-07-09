<script setup>
import Sidebar from '@/public/Sidebar.vue'
import FiltersBar from '@/reservations/components/FiltersBar.vue'
import BabysitterCard from '@/reservations/components/BabysitterCard.vue'
import {BabysitterService} from "@/reservations/service/reservation.service.js";

import {ref, computed, onMounted, watch} from 'vue'
import {BabysitterAssembler} from "@/reservations/service/reservation.assembler.js";

const babysitters = ref([])
const selectedLocation = ref(null)
const selectedRating = ref(null)
const selectedExperienceLevel = ref(null)
const selectedLanguage = ref(null)
const searchQuery = ref('')
const isLoading = ref(false)

// Dynamic options based on backend data
const locations = ref([])
const ratings = ref([])
const experienceLevels = ref([])
const languages = ref([])

onMounted(async () => {
  try {
    isLoading.value = true
    babysitters.value = await BabysitterService.getBabysitters();

    // Extract unique values from backend data for filters
    extractFilterOptions()

    babysitters.value.forEach((babysitter, index) => {
      console.log(`Babysitter ${index}:`, babysitter);
    });
  } catch (error) {
    console.error('Error al obtener babysitters:', error)
  } finally {
    isLoading.value = false
  }
})

const extractFilterOptions = () => {
  const uniqueLocations = [...new Set(babysitters.value
      .map(b => b.location)
      .filter(loc => loc && loc.trim()))]
  locations.value = uniqueLocations.length > 0 ? uniqueLocations : ['Lima', 'Cusco', 'Arequipa']

  const uniqueRatings = [...new Set(babysitters.value
      .map(b => Math.round((b.rating || 0) * 2) / 2)
      .filter(rating => rating > 0))]
      .sort((a, b) => b - a)
  ratings.value = uniqueRatings.length > 0 ? uniqueRatings : [5, 4.5, 4, 3.5, 3]

  const uniqueExperienceLevels = [...new Set(babysitters.value
      .map(b => b.experienceLevel)
      .filter(level => level && level.trim()))]
  experienceLevels.value = uniqueExperienceLevels

  const allLanguages = babysitters.value
      .flatMap(b => b.languages ? b.languages.split(',').map(l => l.trim()) : [])
      .filter(lang => lang)
  languages.value = [...new Set(allLanguages)]
}

const setLocation = (loc) => (selectedLocation.value = loc)
const setRating = (rate) => (selectedRating.value = rate)
const setExperienceLevel = (level) => (selectedExperienceLevel.value = level)
const setLanguage = (lang) => (selectedLanguage.value = lang)
const setSearchQuery = (query) => (searchQuery.value = query)

const resetFilters = () => {
  selectedLocation.value = null
  selectedRating.value = null
  selectedExperienceLevel.value = null
  selectedLanguage.value = null
  searchQuery.value = ''
}

const filteredBabysitters = computed(() => {
  return babysitters.value.filter((babysitter) => {
    // Location filter
    const locationMatch = !selectedLocation.value ||
        (babysitter.location && babysitter.location.toLowerCase().includes(selectedLocation.value.toLowerCase()))

    // Rating filter
    const ratingMatch = !selectedRating.value ||
        Math.abs((babysitter.rating || 0) - selectedRating.value) < 0.5

    // Experience level filter
    const experienceMatch = !selectedExperienceLevel.value ||
        (babysitter.experienceLevel && babysitter.experienceLevel.toLowerCase().includes(selectedExperienceLevel.value.toLowerCase()))

    // Language filter
    const languageMatch = !selectedLanguage.value ||
        (babysitter.languages && babysitter.languages.toLowerCase().includes(selectedLanguage.value.toLowerCase()))

    // Search query filter
    const searchMatch = !searchQuery.value ||
        (babysitter.name && babysitter.name.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
        (babysitter.description && babysitter.description.toLowerCase().includes(searchQuery.value.toLowerCase()))

    return locationMatch && ratingMatch && experienceMatch && languageMatch && searchMatch
  })
})

const totalResults = computed(() => filteredBabysitters.value.length)
const hasActiveFilters = computed(() =>
    selectedLocation.value || selectedRating.value || selectedExperienceLevel.value || selectedLanguage.value || searchQuery.value
)

watch([selectedLocation, selectedRating, selectedExperienceLevel, selectedLanguage, searchQuery], () => {
  console.log('Active filters:', {
    location: selectedLocation.value,
    rating: selectedRating.value,
    experienceLevel: selectedExperienceLevel.value,
    language: selectedLanguage.value,
    search: searchQuery.value
  })
})
</script>

<template>
  <div class="container">
    <div class="main-content">
      <!-- Header Section -->
      <div class="header-section">
        <div class="header-content">
          <h1 class="page-title">Find Your Perfect Babysitter</h1>
          <p class="page-subtitle">Discover trusted and experienced childcare professionals</p>
        </div>
        <div class="results-info">
          <div class="results-count">
            <span class="count-number">{{ totalResults }}</span>
            <span class="count-label">{{ totalResults === 1 ? 'babysitter' : 'babysitters' }} found</span>
          </div>
          <div v-if="hasActiveFilters" class="filter-indicator">
            <i class="pi pi-filter"></i>
            <span>Filters active</span>
          </div>
        </div>
      </div>

      <!-- Enhanced Filters Bar -->
      <div class="filters-section">
        <div class="filters-container">
          <!-- Search Bar -->
          <div class="search-container">
            <div class="search-input-wrapper">
              <i class="pi pi-search search-icon"></i>
              <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search by name or description..."
                  class="search-input"
              />
              <button
                  v-if="searchQuery"
                  @click="searchQuery = ''"
                  class="clear-search-btn"
              >
                <i class="pi pi-times"></i>
              </button>
            </div>
          </div>

          <!-- Filter Options -->
          <div class="filter-options">
            <!-- Location Filter -->
            <div class="filter-group">
              <label class="filter-label">Location</label>
              <select
                  v-model="selectedLocation"
                  class="filter-select"
              >
                <option value="">All locations</option>
                <option
                    v-for="location in locations"
                    :key="location"
                    :value="location"
                >
                  {{ location }}
                </option>
              </select>
            </div>

            <!-- Rating Filter -->
            <div class="filter-group">
              <label class="filter-label">Minimum Rating</label>
              <select
                  v-model="selectedRating"
                  class="filter-select"
              >
                <option value="">Any rating</option>
                <option
                    v-for="rating in ratings"
                    :key="rating"
                    :value="rating"
                >
                  {{ rating }}+ ⭐
                </option>
              </select>
            </div>

            <!-- Experience Level Filter -->
            <div v-if="experienceLevels.length > 0" class="filter-group">
              <label class="filter-label">Experience</label>
              <select
                  v-model="selectedExperienceLevel"
                  class="filter-select"
              >
                <option value="">Any experience</option>
                <option
                    v-for="level in experienceLevels"
                    :key="level"
                    :value="level"
                >
                  {{ level }}
                </option>
              </select>
            </div>

            <!-- Language Filter -->
            <div v-if="languages.length > 0" class="filter-group">
              <label class="filter-label">Language</label>
              <select
                  v-model="selectedLanguage"
                  class="filter-select"
              >
                <option value="">Any language</option>
                <option
                    v-for="language in languages"
                    :key="language"
                    :value="language"
                >
                  {{ language }}
                </option>
              </select>
            </div>
          </div>

          <!-- Reset Filters Button -->
          <div class="filter-actions">
            <button
                v-if="hasActiveFilters"
                @click="resetFilters"
                class="reset-filters-btn"
            >
              <i class="pi pi-refresh"></i>
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="content-section">
        <!-- Loading State -->
        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Loading babysitters...</p>
        </div>

        <!-- No Results State -->
        <div v-else-if="totalResults === 0" class="no-results-container">
          <div class="no-results-icon">
            <i class="pi pi-search"></i>
          </div>
          <h3 class="no-results-title">No babysitters found</h3>
          <p class="no-results-message">
            Try adjusting your filters or search terms to find more results.
          </p>
          <button
              v-if="hasActiveFilters"
              @click="resetFilters"
              class="reset-filters-btn"
          >
            <i class="pi pi-refresh"></i>
            Reset All Filters
          </button>
        </div>

        <!-- Babysitters Grid -->
        <div v-else class="babysitters-grid">
          <BabysitterCard
              v-for="babysitter in filteredBabysitters"
              :key="babysitter.id"
              :babysitter="babysitter"
              class="babysitter-card-item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 2rem;
  scroll-behavior: smooth;
  will-change: scroll-position;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #718096;
  font-weight: 500;
}

.results-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.results-count {
  text-align: right;
}

.count-number {
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
}

.count-label {
  font-size: 0.9rem;
  color: #718096;
  margin-left: 0.5rem;
}

.filter-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 500;
}

.filters-section {
  margin-bottom: 2rem;
}

.filters-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-container {
  margin-bottom: 1.5rem;
}

.search-input-wrapper {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
  font-size: 1.1rem;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.clear-search-btn {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.clear-search-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.filter-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a5568;
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.8);
  color: #4a5568;
  transition: all 0.3s ease;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-actions {
  display: flex;
  justify-content: center;
}

.reset-filters-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.reset-filters-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

.content-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 1rem 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  text-align: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(102, 126, 234, 0.2);
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1.1rem;
  color: #718096;
  font-weight: 500;
}

.no-results-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  text-align: center;
}

.no-results-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.no-results-icon i {
  font-size: 2rem;
  color: white;
}

.no-results-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
}

.no-results-message {
  font-size: 1rem;
  color: #718096;
  margin-bottom: 2rem;
  max-width: 400px;
}

.babysitters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.babysitter-card-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.babysitter-card-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }

  .header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
  }

  .results-info {
    align-items: flex-start;
  }

  .page-title {
    font-size: 2rem;
  }

  .filters-container {
    padding: 1.5rem;
  }

  .filter-options {
    grid-template-columns: 1fr;
  }

  .search-input-wrapper {
    max-width: 100%;
  }

  .babysitters-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .header-section {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .filters-container {
    padding: 1rem;
  }

  .content-section {
    padding: 1rem;
  }
}
</style>