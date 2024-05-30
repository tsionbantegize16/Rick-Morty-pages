Miki MS, [5/30/2024 3:44 PM]
<template>
  <div class="flex">
    <!-- Navigation bar -->
    <nav class="navbar fixed top-0 left-0 h-full w-64 flex flex-col items-center p-4 bg-black shadow-lg">
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

    <!-- Content Section -->
    <div class="content ml-64 p-8 w-full bg-gray-900 min-h-screen">
      <h1 class="text-4xl font-bold mb-6 text-yellow-500">Episodes</h1>

      <!-- Handle loading state -->
      <p v-if="loading" class="text-white">Loading...</p>

      <!-- Handle error state -->
      <p v-else-if="error" class="text-red-600">Something went wrong...</p>

      <!-- Display episode details -->
      <div v-else>
        <div v-for="episode in result.episodes.results" :key="episode.id" class="mb-6 bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
          <h2 class="text-2xl font-semibold mb-2 text-yellow-400">{{ episode.name }}</h2>
          <p class="text-sm text-white mb-1">Air Date: {{ episode.air_date }}</p>
          <p class="text-sm text-white mb-1">Episode: {{ episode.episode }}</p>
          <p class="text-sm text-white mb-4">Created: {{ episode.created }}</p>

          <!-- Display characters in the episode with show more/less functionality -->
          <div>
            <h3 class="text-lg font-semibold mb-2 text-white">Characters</h3>
            <div class="flex flex-wrap">
              <div v-for="(character) in episode.characters.slice(0, showMore[episode.id] ? episode.characters.length : 3)" :key="character.name" class="flex items-center space-x-2 bg-gray-700 p-2 rounded-lg shadow m-2">
                <img :src="character.image" alt="" class="w-16 h-16 rounded-full">
                <span class="text-sm text-white">{{ character.name }} - {{ character.species }}</span>
              </div>
            </div>
            <button @click="toggleShowMore(episode.id)" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
              {{ showMore[episode.id] ? 'Show Less' : 'Show More' }}
            </button>
          </div>

          <!-- Comment section for the episode -->
          <div class="mt-4">
            <h3 class="text-lg font-semibold mb-2 text-white">Comments</h3>
            <textarea
              v-model="newComment[episode.id]"
              class="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white mb-2"
              placeholder="Add a comment"
            ></textarea>
            <button
              @click="addComment(episode.id)"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <ul class="mt-4">
              <li v-for="comment in comments[episode.id]" :key="comment.id" class="p-2 bg-white text-black rounded mb-2 shadow">
                {{ comment.text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

Miki MS, [5/30/2024 3:44 PM]
<!-- Footer -->
  <footer class="bg-gray-800 p-8 text-center border-t border-gray-700 mt-8">
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
import { reactive, ref } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

// Define the GraphQL query for episodes
const EPISODE_QUERY = gql`
  query EPISODE {
    episodes {
      results {
        id
        name
        air_date
        episode
        created
        characters {
          name
          species
          status
          gender
          image
        }
      }
    }
  }
`

// Fetch episodes data using the useQuery hook
const { result, loading, error } = useQuery(EPISODE_QUERY)

// Comments state
const comments = reactive({})
const newComment = ref({})

// Show more/less state
const showMore = reactive({})

// Function to add a comment
const addComment = (episodeId) => {
  if (!newComment.value[episodeId]) return

  if (!comments[episodeId]) {
    comments[episodeId] = []
  }

  comments[episodeId].push({ id: Date.now(), text: newComment.value[episodeId] })
  newComment.value[episodeId] = ''
}

// Function to toggle show more/less
const toggleShowMore = (episodeId) => {
  showMore[episodeId] = !showMore[episodeId]
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
.character-image {
  width: 100%;
  height: auto;
  border-radius: 50%;
}
</style>