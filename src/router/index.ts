import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Recipes from '../views/Recipes.vue'
import Recipe from '../views/Recipe.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipes
  },
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: Recipe
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 