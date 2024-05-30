import { createRouter, createWebHistory } from 'vue-router';
import Characters from '../components/Characters.vue';
import Episode from '../components/Episode.vue';
import Location from '../components/Location.vue';
import Homepage from '../components/Homepage.vue';
import EpisodeDetail from '../components/EpisodeDetail.vue';
import LocationDetail from '../components/LocationDetail.vue';
import CharacterDetail from '../components/CharacterDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Homepage,
    },
    {
      path: '/characters',
      name: 'characters',
      component: Characters,
    },
    {
      path: '/episodes',
      name: 'episodes',
      component: Episode,
    },
    {
      path: '/locations',
      name: 'locations',
      component: Location,
    },
    {
      path: '/episode-detail/:id',
      name: 'episode-detail',
      component: EpisodeDetail,
    },
    {
      path: '/location-detail/:id',
      name: 'location-detail',
      component: LocationDetail,
    },
    {
      path: '/character-detail/:id',
      name: 'character-detail',
      component: CharacterDetail,
    },
  ],
});

export default router;