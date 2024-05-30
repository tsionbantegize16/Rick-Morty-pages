<template>
  <div class="flex">
   <!-- Navigation bar -->
   <nav class="navbar fixed top-0 left-0 h-full w-64 flex flex-col items-center p-4 bg-black">
      <!-- Logo -->
      <div class="logo mb-8">
        <img src="./images.jpg" alt="Logo" class="h-12 rounded-full">
      </div>
      <!-- Navigation Links -->
      <ul class="nav-links flex flex-col space-y-2"> <!-- Reduced space between list items -->
        <li><router-link to="/" class="nav-link text-white">Home</router-link></li>
        <li><router-link to="/episodes" class="nav-link text-white">Episodes</router-link></li>
        <li><router-link to="/characters" class="nav-link text-white">Characters</router-link></li>
        <li><router-link to="/locations" class="nav-link text-white">Locations</router-link></li>
      </ul>
    </nav>

    <div class="content ml-64 p-8 w-full">
      <h1 class="text-2xl font-semibold mb-4 mt-4">Episodes</h1> <!-- Adjusted margin-top for content -->

      <!-- Handle loading state -->
      <p v-if="loading" class="text-white">Loading...</p>

      <!-- Handle error state -->
      <p v-else-if="error" class="text-red-600">Something went wrong...</p>

      <!-- Display episode details -->
      <div v-else>
        <div v-for="episode in result.episodes.results" :key="episode.id" class="mb-6 bg-black p-4 rounded-lg">
          <h2 class="text-lg font-semibold shadow-yellow text-white">{{ episode.name }}</h2>
          <p class="text-sm text-white">Air Date: {{ episode.air_date }}</p>
          <p class="text-sm text-white">Episode: {{ episode.episode }}</p>
          <p class="text-sm text-white">Created: {{ episode.created }}</p>

          <!-- Display characters in the episode -->
          <h3 class="text-lg font-semibold mt-2 mb-1 text-white">Characters</h3>
          <div class="flex flex-wrap space-x-4">
            <div v-for="character in episode.characters" :key="character.name" class="flex items-center space-x-2">
              <div class="card">
                <img :src="character.image" alt="" class="w-16 h-16 rounded-full"> <!-- Decreased image size -->
                <span class="text-sm text-white">{{ character.name }} - {{ character.species }}</span>
              </div>
            </div>
          </div>

          <!-- Comment section for the episode -->
          <div class="mt-4">
            <h3 class="text-lg font-semibold mb-1 text-white">Comments</h3>
            <textarea
              v-model="newComment[episode.id]"
              class="w-full p-2 border border-gray-300 rounded mt-2 bg-black text-white"
              placeholder="Add a comment"
            ></textarea>
            <button
              @click="addComment(episode.id)"
              class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <ul class="mt-4 flex flex-wrap">
              <li v-for="comment in comments[episode.id]" :key="comment.id" class="p-2 bg-white rounded shadow m-2 text-black">
                {{ comment.text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
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

// Function to add a comment
const addComment = (episodeId) => {
  if (!newComment.value[episodeId]) return

  if (!comments[episodeId]) {
    comments[episodeId] = []
  }

  comments[episodeId].push({ id: Date.now(), text: newComment.value[episodeId] })
  newComment.value[episodeId] = ''
}
</script>

<style scoped>
/* No custom CSS needed, all styling is done with Tailwind CSS classes */
</style>
