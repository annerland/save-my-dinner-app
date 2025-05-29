<script setup lang="ts">
import { Clock, Search, Utensils } from 'lucide-vue-next'
import { ref } from 'vue';
import Button from './ui/Button.vue';
import spoon from '../assets/spoon.png';
import tomato from '../assets/tomato.png';
import spaghetti from '../assets/spaghetti.png';
import hat from '../assets/hat.png';
import pasta from '../assets/pasta.png';

const tags = ref(["Chicken", "Pasta", "Rice", "Tomatoes", "Cheese"])

const images = Array(5).fill([
  { src: spoon, alt: 'spoon' },
  { src: tomato, alt: 'tomato' },
  { src: spaghetti, alt: 'spaghetti' },
  { src: hat, alt: 'hat' },
  { src: pasta, alt: 'pasta' }
]).flat();

const positions = [
  { top: '22%', left: '2%' },
  { top: '40%', left: '19%' },
  { top: '68%', left: '4%' },
  { top: '113%', left: '19%' },
  { top: '126%', left: '4%' },
  { top: '16%', left: '77%' },
  { top: '40%', left: '91%' },
  { top: '59%', left: '73%' },
  { top: '79%', left: '84%' },
  { top: '79%', left: '20%' }
];
</script>
<template>
    <section class="container mx-auto px-4 py-16 md:py-24">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Turn Your Ingredients Into
            <span class="text-amber-500 relative">
              Delicious Meals
              <svg class="absolute -bottom-2 left-0 w-full h-3 text-amber-200" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,0 Q50,12 100,0" fill="currentColor" />
              </svg>
            </span>
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            Don't know what to cook? Enter your ingredients and let our AI suggest the perfect meal.
          </p>
          <div class="relative max-w-xl mx-auto mb-12 z-10">
            <div class="absolute inset-0 bg-amber-100 rounded-lg animate-pulse-slow opacity-50"></div>
            <div class="relative bg-white rounded-lg shadow-lg p-6 border border-amber-200 bg-white">
              <div class="flex flex-col md:flex-row gap-3">
                <input type="text" placeholder="Enter your ingredients (e.g., chicken, rice, tomatoes)" class="flex-1 border-amber-200 focus-visible:ring-amber-500" />
                <Button size="small">
                  <Search class="h-4 w-4 mr-2" />
                  Find Recipes
                </Button>
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                <span v-for="tag in tags" :key="tag" class="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm border border-amber-100 hover:bg-amber-100 transition-colors cursor-pointer">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow group z-10">
              <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Search class="h-8 w-8 text-amber-500" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Enter Ingredients</h3>
              <p class="text-gray-600">
                Tell us what you have in your kitchen, and we'll work with what you've got.
              </p>
            </div>
            <div class="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow group z-10">
              <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Utensils class="h-8 w-8 text-amber-500" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Get Recipes</h3>
              <p class="text-gray-600">
                Our AI suggests personalized recipes based on your available ingredients.
              </p>
            </div>
            <div class="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow group z-10">
              <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Clock class="h-8 w-8 text-amber-500" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Cook & Enjoy</h3>
              <p class="text-gray-600">Follow our simple instructions to prepare a delicious meal in no time.</p>
            </div>
          </div>
        </div>
    </section>

    <img v-for="(image, index) in images" :key="image.alt" :src="image.src" :alt="image.alt" class="absolute opacity-30" :style="positions[index]" />
</template>