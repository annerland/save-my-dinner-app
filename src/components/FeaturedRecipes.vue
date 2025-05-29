<script setup lang="ts">
import { ref } from 'vue';
import { ChevronRight } from 'lucide-vue-next'
import Button from './ui/Button.vue';
const featuredRecipes = ref([
  { title: "Creamy Garlic Pasta", description: "A simple yet delicious pasta dish with a creamy garlic sauce.", time: "20 min", rating: 4, reviews: 42 },
  { title: "Quick Veggie Stir Fry", description: "A healthy and colorful vegetable stir fry ready in minutes.", time: "20 min", rating: 4, reviews: 42 },
  { title: "One-Pot Chicken Rice", description: "Flavorful chicken and rice cooked together for maximum flavor.", time: "20 min", rating: 4, reviews: 42 }
])
</script>

<template>
    <section class="bg-amber-50 py-16 relative overflow-hidden">
        <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto text-center mb-12">
                <h2 class="text-3xl font-bold mb-4">Featured Recipes</h2>
                <p class="text-gray-600">Discover popular recipes loved by our community</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="recipe in featuredRecipes" :key="recipe.title" class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                    <div class="h-48 bg-amber-200 relative overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center text-amber-500">
                            <img src="" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div class="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {{ recipe.time }}
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2 group-hover:text-amber-500 transition-colors">
                            {{ recipe.title }}
                        </h3>
                        <p class="text-gray-600 mb-4">
                            {{ recipe.description }}
                        </p>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center">
                            <span class="text-amber-500 mr-1">★★★★</span>
                            <span class="text-gray-400">★</span>
                            <span class="text-gray-600 text-sm ml-1">({{ recipe.reviews }})</span>
                            </div>
                            <Button variant="default" size="small">
                                View Recipe
                                <ChevronRight class="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-12">
                <Button class="cursor-pointer border-amber-500 text-amber-500 hover:text-amber-700">View All Recipes</Button>
            </div>
        </div>
    </section>
</template>