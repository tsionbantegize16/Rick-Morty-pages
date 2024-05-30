<template>
  <!-- The template contains a carousel component -->
  <div class="relative w-full h-64 overflow-hidden">
    <!-- Carousel container -->
    <div
      class="flex transition-transform duration-700"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <!-- Carousel items -->
      <div
        v-for="(image, index) in images"
        :key="index"
        class="w-full flex-shrink-0"
      >
        <!-- Image in the carousel item -->
        <img :src="image" class="w-full h-64 object-cover" alt="carousel image" />
      </div>
    </div>
    <!-- Previous button -->
    <button
      class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      @click="prev"
    >
      ‹
    </button>
    <!-- Next button -->
    <button
      class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      @click="next"
    >
      ›
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// State variables for carousel functionality
const currentIndex = ref(0); // Current index of the carousel
const images = ref([ // Array of image URLs for the carousel
  './src/img/download (1).jpg',
  './src/img/download (2).jpg',
  './src/img/download (3).jpg',
  './src/img/download.jpg',
]);

// Function to move to the previous image in the carousel
const prev = () => {
  currentIndex.value =
    currentIndex.value > 0 ? currentIndex.value - 1 : images.value.length - 1;
};

// Function to move to the next image in the carousel
const next = () => {
  currentIndex.value =
    currentIndex.value < images.value.length - 1 ? currentIndex.value + 1 : 0;
};

// Automatically switch to the next image every 3 seconds
let interval;
onMounted(() => {
  interval = setInterval(() => {
    next();
  }, 3000);
});

// Clear the interval when the component is unmounted to prevent memory leaks
onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
/* Styling for carousel items */
.carousel-item {
  max-width: 50vw; /* Set maximum width to half of the viewport width */
  margin: 0 ; /* Center the items horizontally */
  flex: 0 0 ; /* Allow items to shrink to fit content */
  transition: transform 0.5s ease-in-out; /* Smooth transition effect */
}
</style>
