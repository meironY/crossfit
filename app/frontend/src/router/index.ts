import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Coach from '@/views/Coach.vue'
import TrainerView from '@/views/TrainerView.vue'
import WorkoutView from '@/views/WorkoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/coach/:id',
      name: 'coach',
      component: Coach,
      props: true
    },
    {
      path: '/coach/:coachId/workout/:id',
      name: 'coachworkout',
      component: WorkoutView,
      props: true
    },
    {
      path: '/coach/:coachId/trainer/:id',
      name: 'coachtrainer',
      component: TrainerView,
      props: true
    }
  ]
})

export default router
