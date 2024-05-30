Miki MS, [5/30/2024 3:08 PM]
<template>
  <div class="bg-gray-900 text-white min-h-screen flex">
    <!-- Navigation bar -->
    <nav class="navbar fixed top-0 left-0 h-full w-20 flex flex-col items-center p-4 bg-gray-800 shadow-lg">
      <!-- Logo -->
      <div class="logo mb-4">
        <img src="./images.jpg" alt="Logo" class="h-12 rounded-full transition-transform duration-300 hover:scale-110">
      </div>
      <!-- Navigation Links -->
      <ul class="nav-links flex flex-col space-y-4">
        <li><router-link to="/" class="nav-link">Home</router-link></li>
        <li><router-link to="/episodes" class="nav-link">Episodes</router-link></li>
        <li><router-link to="/characters" class="nav-link">Characters</router-link></li>
        <li><router-link to="/locations" class="nav-link">Locations</router-link></li>
      </ul>
    </nav>

    <!-- Content Section -->
    <div class="content-section ml-24 p-8 w-full">
      <!-- Show details -->
      <div class="p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 class="text-5xl font-bold mb-6 text-yellow-500">Rick and Morty</h1>

        <!-- Carousel of show images -->
        <Carousel class="mb-8" />

        <!-- Show details -->
        <div>
          <p class="text-xl font-semibold mb-2">Description/Storyline of the show</p>
          <p class="mb-4">Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and Dan Harmon. The show follows the misadventures of an eccentric and alcoholic scientist named Rick Sanchez, who drags his good-hearted but easily influenced grandson Morty Smith on dangerous adventures across the multiverse.</p>
          <p class="text-xl font-semibold mb-2">Genre</p>
          <p class="mb-4">Science Fiction, Adventure, Comedy</p>
          <p class="text-xl font-semibold mb-2">Creators</p>
          <p class="mb-4">Justin Roiland, Dan Harmon</p>
          <p class="text-xl font-semibold mb-2">Stars</p>
          <p class="mb-4">Justin Roiland, Chris Parnell, Spencer Grammer, Sarah Chalke</p>
          <p class="text-xl font-semibold mb-2">Rating</p>
          <p class="mb-4">9.2/10 (IMDb)</p>
        </div>
      </div>

      <!-- Episodes -->
      <div class="episodes-section p-8">
        <h2 class="text-3xl font-semibold mb-4">Episodes</h2>
        <!-- List of episodes -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="episode in episodes" :key="episode.id" class="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <router-link :to="{ name: 'episode-detail', params: { id: episode.id } }" class="block">
              <p class="font-semibold text-yellow-400">{{ episode.name }}</p>
              <p class="text-sm">{{ episode.air_date }}</p>
              <p class="text-sm">{{ episode.episode }}</p>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Characters -->
      <div class="characters-section p-8">
        <h2 class="text-3xl font-semibold mb-4">Characters</h2>
        <!-- List of characters -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="character in characters" :key="character.id" class="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <router-link :to="{ name: 'character-detail', params: { id: character.id } }" class="block">
              <img :src="character.image" alt="" class="character-image mb-4">
              <p class="text-lg text-yellow-400">{{ character.name }}</p>
            </router-link>
          </div>
        </div>
      </div>

Miki MS, [5/30/2024 3:08 PM]
<!-- Locations -->
      <div class="locations-section p-8">
        <h2 class="text-3xl font-semibold mb-4">Locations</h2>
        <!-- List of locations -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="location in locations" :key="location.id" class="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <router-link :to="{ name: 'location-detail', params: { id: location.id } }" class="block">
              <p class="font-semibold text-yellow-400">{{ location.name }}</p>
              <p class="text-sm">{{ location.dimension }}</p>
              <p class="text-sm">{{ location.type }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-gray-800 p-8 text-center border-t border-gray-700">
    <div class="text-white">
      <p class="text-2xl font-bold mb-6">Tsion Bantegize</p>
      <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-8 md:space-y-0">
        <p class="text-gray-400 text-lg flex items-center">
          <svg class="w-6 h-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          GitHub account: <a href="https://github.com/tsionbantegize16/Rick-and-Morty.git" class="text-red-500 hover:underline ml-1">View GitHub</a>
        </p>
        <p class="text-gray-400 text-lg flex items-center">
          <svg class="w-6 h-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.85 17.6a2.7 2.7 0 01-.7-.5L3 14.95l1.35-1.35a6 6 0 015.3-1.55M12 12v.01M12 3l9.6 9.6a2 2 0 010 2.83L12 24l-1.35-1.35"></path>
          </svg>
          Figma Design: <a href="https://www.figma.com/design/giRn2ZSj86xEkMPBw0ngUD/Untitled?node-id=0-1&t=vkhVEKkdbdJAkgbo-1" class="text-red-500 hover:underline ml-1">View Design</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable'
import { RouterLink } from 'vue-router'
import { gql } from '@apollo/client/core'
import { ref, watchEffect } from 'vue'
import Carousel from './Carousel.vue'  // Import the Carousel component

// Define the new GraphQL queries
const GET_ALL_EPISODES = gql`
  query {
    episodes {
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`

const GET_ALL_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`

const GET_ALL_LOCATIONS = gql`
  query {
    locations {
      results {
        id
        name
        dimension
        type
      }
    }
  }
`

// Fetch data for episodes, characters, and locations
const { result: episodesResult, loading: loadingEpisodes, error: errorEpisodes } = useQuery(GET_ALL_EPISODES)
const { result: charactersResult, loading: loadingCharacters, error: errorCharacters } = useQuery(GET_ALL_CHARACTERS)
const { result: locationsResult, loading: loadingLocations, error: errorLocations } = useQuery(GET_ALL_LOCATIONS)

// Extract data from the query results
const episodes = ref([])
const characters = ref([])
const locations = ref([])

watchEffect(() => {
  if (episodesResult.value) {
    episodes.value = episodesResult.value.episodes.results
  }
  if (charactersResult.value) {
    characters.value = charactersResult.value.characters.results
  }
  if (locationsResult.value) {
    locations.value = locationsResult.value.locations.results
  }
})
</script>

Miki MS, [5/30/2024 3:08 PM]
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
.character-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: transform 0.3s ease;
}
.character-image:hover {
  transform: scale(1.1);
}
</style>