<script setup>
import { ref, computed } from 'vue'
import { Utensils, Clock, Star, Users } from 'lucide-vue-next'

const categories = ["All", "Quick Meals", "Vegetarian", "Desserts", "Breakfast", "Dinner", "Healthy"]
const selectedCategory = ref("All")
const sortOption = ref("newest")

const recipes = ref([
  {
    id: 1,
    title: "Creamy Garlic Parmesan Pasta",
    description:
      "A rich and indulgent pasta dish that comes together in just 20 minutes with simple pantry ingredients.",
    category: "Quick Meals",
    image: "/placeholder.svg?height=240&width=400",
    author: "Chef Maria Rodriguez",
    date: "28 Jan 2024",
    readTime: "15 mins",
    cookTime: "20 mins",
    servings: 4,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    title: "Mediterranean Quinoa Bowl",
    description: "Fresh and healthy bowl packed with Mediterranean flavors, perfect for a nutritious lunch or dinner.",
    category: "Healthy",
    image: "/placeholder.svg?height=240&width=400",
    author: "Nutritionist Sarah Chen",
    date: "26 Jan 2024",
    readTime: "12 mins",
    cookTime: "25 mins",
    servings: 2,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    title: "Classic Chocolate Chip Cookies",
    description: "The ultimate comfort dessert with crispy edges and chewy centers that everyone will love.",
    category: "Desserts",
    image: "/placeholder.svg?height=240&width=400",
    author: "Baker Emma Thompson",
    date: "25 Jan 2024",
    readTime: "18 mins",
    cookTime: "35 mins",
    servings: 24,
    rating: 4.7,
    reviews: 203,
  },
  {
    id: 4,
    title: "Avocado Toast Variations",
    description: "Five creative ways to elevate your morning avocado toast with simple yet delicious toppings.",
    category: "Breakfast",
    image: "/placeholder.svg?height=240&width=400",
    author: "Food Blogger Alex Kim",
    date: "24 Jan 2024",
    readTime: "8 mins",
    cookTime: "10 mins",
    servings: 1,
    rating: 4.6,
    reviews: 67,
  },
  {
    id: 5,
    title: "Spicy Thai Basil Stir Fry",
    description:
      "An authentic Thai dish bursting with aromatic basil and the perfect balance of sweet and spicy flavors.",
    category: "Dinner",
    image: "/placeholder.svg?height=240&width=400",
    author: "Chef Somchai Patel",
    date: "23 Jan 2024",
    readTime: "20 mins",
    cookTime: "15 mins",
    servings: 3,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 6,
    title: "Roasted Vegetable Medley",
    description: "A colorful and nutritious side dish featuring seasonal vegetables roasted to perfection with herbs.",
    category: "Vegetarian",
    image: "/placeholder.svg?height=240&width=400",
    author: "Chef David Green",
    date: "22 Jan 2024",
    readTime: "10 mins",
    cookTime: "40 mins",
    servings: 6,
    rating: 4.5,
    reviews: 92,
  },
])

const filteredRecipes = computed(() => {
  if (selectedCategory.value === "All") {
    return recipes.value
  }
  return recipes.value.filter(recipe => recipe.category === selectedCategory.value)
})
</script>

<template>
    <div class="min-h-screen bg-white">
      <section class="relative h-[500px] overflow-hidden">
        <div
          class="absolute inset-0 bg-cover bg-center"
          style="background-image: url('/placeholder.svg?height=500&width=1200'); background-blend-mode: overlay; background-color: rgba(0,0,0,0.4);"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
        </div>
        <div class="relative container mx-auto px-4 h-full flex items-center">
          <div class="max-w-2xl text-white">
            <div class="inline-block bg-amber-500 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
              Featured Recipe
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">Mastering the Art of Homemade Pasta</h1>
            <p class="text-xl mb-6 text-gray-200">
              Discover the secrets to creating restaurant-quality pasta from scratch with simple ingredients and
              traditional techniques.
            </p>
            <div class="flex items-center gap-6 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <Utensils class="h-4 w-4" />
                </div>
                <span>Chef Isabella Romano</span>
              </div>
              <span>29 Jan 2024</span>
              <span>25 mins read</span>
            </div>
            <div class="flex gap-2 mt-6">
              <div class="w-2 h-2 bg-white rounded-full"></div>
              <div class="w-2 h-2 bg-white/50 rounded-full"></div>
              <div class="w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
  
      <section class="container mx-auto px-4 py-16">
        <div class="mb-12">
          <h2 class="text-3xl font-bold mb-4">Recipe Collection</h2>
          <p class="text-gray-600 max-w-2xl">
            Explore our curated collection of delicious recipes, cooking tips, and culinary inspiration to help you
            create amazing meals at home.
          </p>
        </div>
  
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category"
              :class="[
                'px-4 py-2 rounded-md transition-colors cursor-pointer',
                selectedCategory === category
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'text-gray-600 hover:text-amber-500 hover:bg-amber-50'
              ]"
              @click="selectedCategory = category"
            >
              {{ category }}
            </button>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Sort by:</span>
            <select
              v-model="sortOption"
              class="w-32 border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="time">Cook Time</option>
            </select>
          </div>
        </div>
  
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="recipe in filteredRecipes"
            :key="recipe.id"
            class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group cursor-pointer"
          >
            <div class="relative h-48 overflow-hidden bg-amber-200">
              <div class="absolute top-3 left-3">
                <span class="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {{ recipe.category }}
                </span>
              </div>
              <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                <Clock class="h-3 w-3" />
                {{ recipe.cookTime }}
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2 group-hover:text-amber-500 transition-colors">
                {{ recipe.title }}
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ recipe.description }}</p>
  
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-1">
                  <Star class="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span class="text-sm font-medium">{{ recipe.rating }}</span>
                  <span class="text-sm text-gray-500">({{ recipe.reviews }})</span>
                </div>
                <div class="flex items-center gap-1 text-sm text-gray-500">
                  <Users class="h-4 w-4" />
                  {{ recipe.servings }} servings
                </div>
              </div>
  
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <Utensils class="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <p class="text-sm font-medium">{{ recipe.author }}</p>
                    <p class="text-xs text-gray-500">{{ recipe.date }}</p>
                  </div>
                </div>
                <button class="text-amber-500 hover:text-amber-600 hover:bg-amber-50 font-medium">
                  Read Recipe →
                </button>
              </div>
            </div>
          </article>
        </div>
  
        <div class="text-center mt-12">
          <button class="px-4 py-2 border border-amber-500 text-amber-500 rounded-md hover:bg-amber-50 transition-colors">
            Load More Recipes
          </button>
        </div>
      </section>
    </div>
</template>