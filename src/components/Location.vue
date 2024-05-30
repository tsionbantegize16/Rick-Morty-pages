
<template>
  <div class="flex">
    <!-- Navigation bar -->
    <nav class="navbar fixed top-0 left-0 h-full w-24 flex flex-col items-center p-2 bg-black shadow-lg">
      <!-- Logo -->
      <div class="logo my-4">
        <img src="./images.jpg" alt="Logo" class="h-8 rounded-full transition-transform duration-300 hover:scale-110">
      </div>
      <!-- Navigation Links -->
      <ul class="nav-links flex flex-col space-y-2">
        <li><router-link to="/" class="nav-link text-white hover:text-yellow-500">Home</router-link></li>
        <li><router-link to="/episodes" class="nav-link text-white hover:text-yellow-500">Episodes</router-link></li>
        <li><router-link to="/characters" class="nav-link text-white hover:text-yellow-500">Characters</router-link></li>
        <li><router-link to="/locations" class="nav-link text-white hover:text-yellow-500">Locations</router-link></li>
      </ul>
    </nav>

    <!-- Location data -->
    <div class="location-data p-4 ml-24 w-full bg-gray-900 min-h-screen">
      <h1 class="text-4xl font-bold mb-8 text-center text-yellow-500">Locations</h1>

      <!-- Handle loading state -->
      <p v-if="loading" class="text-gray-400">Loading...</p>

      <!-- Handle error state -->
      <p v-else-if="error" class="text-red-600">Something went wrong...</p>

      <!-- Display location details -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="location in result.locations.results" :key="location.id" class="location-card bg-gray-800 text-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
          <!-- Carousel integration for location images -->
          <div class="relative w-full h-64 overflow-hidden mb-4">
            <div class="flex transition-transform duration-700" :style=" `transform: translateX(${currentIndexes[location.id] * 100}%) `">
              <div v-for="(resident, index) in location.residents" :key="index" class="w-full flex-shrink-0">
                <img :src="resident.image" class="w-full h-64 object-cover rounded-lg shadow-lg" alt="resident image" />
              </div>
            </div>
            <button class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full" @click="prev(location.id)">
              ‹
            </button>
            <button class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full" @click="next(location.id)">
              ›
            </button>
          </div>
          <!-- End of Carousel integration -->

          <!-- Location details -->
          <h2 class="text-xl font-semibold mb-2">{{ location.name }}</h2>
          <div class="flex flex-wrap justify-center mb-2">
            <p class="font-semibold">Type:</p>
            <p class="ml-1">{{ location.type }}</p>
          </div>
          <div class="flex flex-wrap justify-center mb-2">
            <p class="font-semibold">Dimension:</p>
            <p class="ml-1">{{ location.dimension }}</p>
          </div>
          <div class="flex flex-wrap justify-center mb-2">
            <p class="font-semibold">Created:</p>
            <p class="ml-1">{{ location.created }}</p>
          </div>

          <button @click="toggleShowMore(location.id)" class="mt-4 text-blue-500 hover:underline">
            {{ showMore[location.id] ? 'See Less' : 'See More' }}
          </button>

<!-- Display residents in the location -->
          <div v-if="showMore[location.id]">
            <h3 class="mt-4 text-lg font-semibold">Residents</h3>
            <div class="flex flex-wrap justify-center">
              <div v-for="resident in location.residents" :key="resident.name" class="resident-card flex flex-col items-center mr-4 mb-2">
                <img :src="resident.image" alt="" class="w-12 h-12 rounded-full mb-1 shadow-lg">
                <span class="text-sm">{{ resident.name }} - {{ resident.species }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { ref, onMounted, onUnmounted } from 'vue'

// Define the GraphQL query for locations
const LOCATION_QUERY = gql`
  query LOCATION {
    locations {
      results {
        id
        name
        type
        dimension
        created
        residents {
          name
          status
          species
          gender
          image
        }
      }
    }
  }
`

// Fetch location data using the useQuery hook
const { result, loading, error } = useQuery(LOCATION_QUERY)

// Carousel functionality
const currentIndexes = ref({})
const prev = (id) => {
  currentIndexes.value[id] =
    currentIndexes.value[id] > 0 ? currentIndexes.value[id] - 1 : result.locations.results.find(location => location.id === id).residents.length - 1
}
const next = (id) => {
  currentIndexes.value[id] =
    currentIndexes.value[id] < result.locations.results.find(location => location.id === id).residents.length - 1 ? currentIndexes.value[id] + 1 : 0
}
let interval
onMounted(() => {
  interval = setInterval(() => {
    for (const id in currentIndexes.value) {
      next(id)
    }
  }, 3000)
})
onUnmounted(() => {
  clearInterval(interval)
})

// Manage the visibility of additional details
const showMore = ref({})

const toggleShowMore = (id) => {
  showMore.value[id] = !showMore.value[id]
}
</script>

<style scoped>
.navbar .nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 0;
  transition: color 0.3s ease;
}
.navbar .nav-link:hover {
  color: #ffd700;
}
</style>