<template>
  <div class="flex">
    <!-- Navigation bar -->
    <nav class="navbar fixed top-0 left-0 h-full w-20 flex flex-col items-center p-2 bg-black shadow-lg">
      <!-- Logo -->
      <div class="logo mb-8">
        <img src="./images.jpg" alt="Logo" class="h-12 rounded-full transition-transform duration-300 hover:scale-110">
      </div>
      <!-- Navigation Links -->
      <ul class="nav-links flex flex-col space-y-4">
        <li><router-link to="/" class="nav-link text-white hover:text-yellow-500">Home</router-link></li>
        <li><router-link to="/episodes" class="nav-link text-white hover:text-yellow-500">Episodes</router-link></li>
        <li><router-link to="/characters" class="nav-link text-white hover:text-yellow-500">Characters</router-link></li>
        <li><router-link to="/locations" class="nav-link text-white hover:text-yellow-500">Locations</router-link></li>
      </ul>
    </nav>

    <!-- Display character details -->
    <div class="content p-4 ml-20 w-full bg-gray-900 min-h-screen">
      <h1 class="text-4xl font-bold mb-8 text-center text-yellow-500">Characters</h1>

      <!-- Handle loading state -->
      <p v-if="loading" class="text-gray-400">Loading...</p>

      <!-- Handle error state -->
      <p v-else-if="error" class="text-red-600">Something went wrong...</p>

      <!-- Display character details -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="character in result.characters.results" :key="character.id" class="character-card bg-gray-800 text-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
          <div class="flex items-center">
            <div class="character-image-container">
              <img :src="character.image" alt="" class="w-32 h-32 rounded-full shadow-lg">
            </div>
            <div class="ml-4">
              <h2 class="text-2xl font-semibold">{{ character.name }}</h2>
              <p>Status: {{ character.status }}</p>
              <p>Species: {{ character.species }}</p>
              <p>Gender: {{ character.gender }}</p>
            </div>
          </div>

          <!-- Display episodes the character participated in -->
          <div v-if="showMore[character.id]">
            <h3 class="mt-4 font-semibold">Episodes</h3>
            <ul class="ml-4 list-disc list-inside">
              <li v-for="episode in character.episode" :key="episode.name">
                <span>{{ episode.name }} - {{ episode.air_date }}</span>
              </li>
            </ul>

            <!-- Show last known location of the character -->
            <h3 class="mt-4 font-semibold">Last Known Location</h3>
            <p>{{ character.location.name }}</p>
          </div>

          <button @click="toggleShowMore(character.id)" class="mt-4 text-blue-500 hover:underline">
            {{ showMore[character.id] ? 'See Less' : 'See More' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { ref } from 'vue'

// Define the GraphQL query for characters
const CHARACTER_QUERY = gql`
  query Characters {
    characters {
      results {
        id
        name
        status
        species
        gender
        image
        episode {
          name
          air_date
        }
        location {
          name
        }
        created
      }
    }
  }
`

// Fetch character data using the useQuery hook
const { result, loading, error } = useQuery(CHARACTER_QUERY);

// Manage the visibility of additional details
const showMore = ref({});

const toggleShowMore = (id) => {
  showMore.value[id] = !showMore.value[id];
};
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
.character-image-container {
  flex-shrink: 0;
}
.character-card {
  border: 1px solid #333;
}
</style>