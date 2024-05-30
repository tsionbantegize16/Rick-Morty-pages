<template>
  <div class="character-page">
    <!-- Navigation bar -->
    <nav class="navbar fixed top-0 left-0 h-full w-20 flex flex-col items-center p-2 bg-black">
      <!-- Logo -->
      <div class="logo mb-8">
        <img src="./images.jpg" alt="Logo" class="h-12 rounded-full">
      </div>
      <!-- Navigation Links -->
      <ul class="nav-links flex flex-col space-y-4">
        <li><router-link to="/" class="nav-link text-white">Home</router-link></li>
        <li><router-link to="/episodes" class="nav-link text-white">Episodes</router-link></li>
        <li><router-link to="/characters" class="nav-link text-white">Characters</router-link></li>
        <li><router-link to="/locations" class="nav-link text-white">Locations</router-link></li>
      </ul>
    </nav>

    <!-- Display character details -->
    <div class="content p-4 ml-20">
      <h1 class="text-3xl font-semibold mb-8 text-center">Characters</h1>

      <!-- Handle loading state -->
      <p v-if="loading" class="text-gray-600">Loading...</p>

      <!-- Handle error state -->
      <p v-else-if="error" class="text-red-600">Something went wrong...</p>

      <!-- Display character details -->
      <div v-else class="grid grid-cols-3 gap-4">
        <div v-for="character in result.characters.results" :key="character.id" class="mb-8 character-card bg-black text-white rounded shadow-md p-6">
          <div class="flex items-center">
            <div class="character-image-container">
              <img :src="character.image" alt="" class="w-32 h-32 rounded-full">
            </div>
            <div class="ml-4">
              <h2 class="text-xl font-semibold">{{ character.name }}</h2>
              <p>Status: {{ character.status }}</p>
              <p>Species: {{ character.species }}</p>
              <p>Gender: {{ character.gender }}</p>
            </div>
          </div>

          <!-- Display episodes the character participated in -->
          <div v-if="showMore[character.id]">
            <h3 class="mt-4">Episodes</h3>
            <ul class="ml-4">
              <li v-for="episode in character.episode" :key="episode.name">
                <span>{{ episode.name }} - {{ episode.air_date }}</span>
              </li>
            </ul>

            <!-- Show last known location of the character -->
            <h3 class="mt-4">Last Known Location</h3>
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
/* No custom CSS needed, all styling is done with Tailwind CSS classes */
</style>
