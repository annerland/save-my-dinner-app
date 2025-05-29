<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  Utensils, ChevronRight, Clock, Timer, Users, Star, 
  Heart, Share2, Bookmark, ShoppingCart, ChefHat, Minus, Plus, 
  Activity, Lightbulb
} from 'lucide-vue-next'

const props = defineProps({
  recipeId: {
    type: String,
    default: '1'
  }
})

const isFavorite = ref(false)
const currentServings = ref(4)
const timerMinutes = ref(20)
const isTimerRunning = ref(false)
const timeRemaining = ref(0)
const timerInterval = ref(null)

const recipe = ref({
  id: 1,
  title: "Creamy Garlic Parmesan Pasta",
  description: "A rich and indulgent pasta dish that comes together in just 20 minutes with simple pantry ingredients. Perfect for a weeknight dinner or when you're craving something comforting and delicious.",
  category: "Quick Meals",
  image: "/placeholder.svg?height=500&width=800",
  author: "Chef Maria Rodriguez",
  authorTitle: "Italian Cuisine Specialist",
  date: "28 Jan 2024",
  readTime: "15 mins",
  prepTime: "10 mins",
  cookTime: "20 mins",
  servings: 4,
  rating: 4.8,
  reviews: 124,
  ingredients: [
    "1 lb (450g) fettuccine pasta",
    "4 cloves garlic, minced",
    "1/2 cup (120ml) heavy cream",
    "1 cup (100g) freshly grated Parmesan cheese",
    "3 tbsp butter",
    "2 tbsp olive oil",
    "1/4 cup fresh parsley, chopped",
    "Salt and black pepper to taste",
    "1/4 tsp red pepper flakes (optional)"
  ],
  instructions: [
    "Bring a large pot of salted water to boil. Cook fettuccine according to package directions until al dente. Reserve 1 cup of pasta water before draining.",
    "While pasta cooks, heat olive oil and 1 tablespoon of butter in a large skillet over medium heat. Add minced garlic and cook for 1-2 minutes until fragrant.",
    "Pour in the heavy cream and bring to a gentle simmer. Let it cook for 2-3 minutes to thicken slightly.",
    "Add the drained pasta to the skillet with the cream sauce. Toss to combine, adding pasta water gradually if needed to achieve desired consistency.",
    "Remove from heat and add the remaining butter and grated Parmesan cheese. Toss vigorously until the cheese melts and creates a smooth, creamy sauce.",
    "Season with salt, black pepper, and red pepper flakes if using. Garnish with fresh parsley and serve immediately with extra Parmesan cheese."
  ],
  nutrition: {
    calories: 520,
    protein: 18,
    carbs: 65,
    fat: 22
  },
  tips: [
    "Use freshly grated Parmesan cheese for the best flavor and texture - pre-grated cheese won't melt as smoothly.",
    "Don't let the cream sauce boil vigorously as it may curdle. Keep it at a gentle simmer.",
    "Save some pasta water! The starchy water helps bind the sauce to the pasta perfectly.",
    "Serve immediately while hot for the best creamy texture. The sauce will thicken as it cools."
  ]
})

const relatedRecipes = ref([
  {
    id: 2,
    title: "Classic Carbonara",
    category: "Italian",
    rating: 4.9,
    cookTime: "15 mins"
  },
  {
    id: 3,
    title: "Mushroom Risotto",
    category: "Comfort Food",
    rating: 4.7,
    cookTime: "35 mins"
  },
  {
    id: 4,
    title: "Pesto Gnocchi",
    category: "Quick Meals",
    rating: 4.6,
    cookTime: "12 mins"
  }
])

const adjustedIngredients = computed(() => {
  const ratio = currentServings.value / recipe.value.servings
  return recipe.value.ingredients.map(ingredient => {
    return ingredient.replace(/(\d+(?:\.\d+)?)\s*(\w+)?/g, (match, number, unit) => {
      const adjustedAmount = (parseFloat(number) * ratio).toFixed(1).replace('.0', '')
      return unit ? `${adjustedAmount} ${unit}` : adjustedAmount
    })
  })
})

const timerProgress = computed(() => {
  if (!isTimerRunning.value) return 0
  const totalTime = timerMinutes.value * 60
  const elapsed = totalTime - timeRemaining.value
  return (elapsed / totalTime) * 100
})

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const adjustServings = (change) => {
  const newServings = currentServings.value + change
  if (newServings >= 1 && newServings <= 20) {
    currentServings.value = newServings
  }
}

const startTimer = () => {
  if (timerMinutes.value <= 0) return
  
  isTimerRunning.value = true
  timeRemaining.value = timerMinutes.value * 60
  
  timerInterval.value = setInterval(() => {
    timeRemaining.value--
    
    if (timeRemaining.value <= 0) {
      stopTimer()
      alert('Timer finished! Your dish is ready!')
    }
  }, 1000)
}

const stopTimer = () => {
  isTimerRunning.value = false
  timeRemaining.value = 0
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Lifecycle
onMounted(() => {
  console.log(`Loading recipe with ID: ${props.recipeId}`)
})

onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
  }
})
</script>

<template>
    <div class="min-h-screen bg-white">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center gap-2 text-sm text-gray-600">
          <router-link to="/" class="hover:text-amber-500 transition-colors">Home</router-link>
          <ChevronRight class="h-4 w-4" />
          <router-link to="/recipes" class="hover:text-amber-500 transition-colors">Recipes</router-link>
          <ChevronRight class="h-4 w-4" />
          <span class="text-gray-900">{{ recipe.title }}</span>
        </nav>
      </div>
  
      <section class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
          <div class="mb-6">
            <div class="flex flex-wrap items-center gap-3 mb-4">
              <span class="bg-amber-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                {{ recipe.category }}
              </span>
              <span class="text-sm text-gray-500">{{ recipe.date }}</span>
              <span class="text-sm text-gray-500">{{ recipe.readTime }} read</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">{{ recipe.title }}</h1>
            <p class="text-xl text-gray-600 mb-6">{{ recipe.description }}</p>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div class="bg-amber-50 rounded-lg p-4 text-center">
                <Clock class="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <div class="text-sm text-gray-600">Prep Time</div>
                <div class="font-semibold">{{ recipe.prepTime }}</div>
              </div>
              <div class="bg-amber-50 rounded-lg p-4 text-center">
                <Timer class="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <div class="text-sm text-gray-600">Cook Time</div>
                <div class="font-semibold">{{ recipe.cookTime }}</div>
              </div>
              <div class="bg-amber-50 rounded-lg p-4 text-center">
                <Users class="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <div class="text-sm text-gray-600">Servings</div>
                <div class="font-semibold">{{ recipe.servings }}</div>
              </div>
              <div class="bg-amber-50 rounded-lg p-4 text-center">
                <Star class="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <div class="text-sm text-gray-600">Rating</div>
                <div class="font-semibold">{{ recipe.rating }}/5</div>
              </div>
            </div>
  
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Utensils class="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p class="font-semibold">{{ recipe.author }}</p>
                  <p class="text-sm text-gray-600">{{ recipe.authorTitle }}</p>
                </div>
              </div>
              <div class="flex gap-2">
                <button 
                  @click="toggleFavorite"
                  :class="[
                    'p-2 rounded-full transition-colors',
                    isFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-amber-100 hover:text-amber-500'
                  ]"
                >
                  <Heart :class="['h-5 w-5', isFavorite ? 'fill-current' : '']" />
                </button>
                <button class="p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-amber-100 hover:text-amber-500 transition-colors">
                  <Share2 class="h-5 w-5" />
                </button>
                <button class="p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-amber-100 hover:text-amber-500 transition-colors">
                  <Bookmark class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Recipe Image -->
      <section class="container mx-auto px-4 mb-12">
        <div class="max-w-4xl mx-auto">
          <div class="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
            <img
              :src="recipe.image"
              :alt="recipe.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </section>
      <section class="container mx-auto px-4 pb-16">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div class="lg:col-span-1">
              <div class="sticky top-8">
                <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                  <ShoppingCart class="h-6 w-6 text-amber-500" />
                  Ingredients
                </h2>
                <div class="bg-amber-50 rounded-lg p-6">
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-sm text-gray-600">Servings:</span>
                    <div class="flex items-center gap-2">
                      <button 
                        @click="adjustServings(-1)"
                        class="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 hover:border-amber-300 transition-colors"
                      >
                        <Minus class="h-4 w-4" />
                      </button>
                      <span class="font-semibold w-8 text-center">{{ currentServings }}</span>
                      <button 
                        @click="adjustServings(1)"
                        class="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 hover:border-amber-300 transition-colors"
                      >
                        <Plus class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <ul class="space-y-3">
                    <li 
                      v-for="(ingredient, index) in adjustedIngredients" 
                      :key="index"
                      class="flex items-start gap-3"
                    >
                      <input 
                        type="checkbox" 
                        :id="`ingredient-${index}`"
                        class="mt-1 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                      />
                      <label :for="`ingredient-${index}`" class="text-sm leading-relaxed">
                        {{ ingredient }}
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
  
            <div class="lg:col-span-2">
              <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                <ChefHat class="h-6 w-6 text-amber-500" />
                Instructions
              </h2>
              <div class="space-y-6">
                <div 
                  v-for="(step, index) in recipe.instructions" 
                  :key="index"
                  class="flex gap-4"
                >
                  <div class="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1">
                    <p class="text-gray-700 leading-relaxed">{{ step }}</p>
                  </div>
                </div>
              </div>
  
              <!-- Cooking Timer -->
              <div class="mt-8 bg-gray-50 rounded-lg p-6">
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Timer class="h-5 w-5 text-amber-500" />
                  Cooking Timer
                </h3>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2">
                    <input 
                      v-model="timerMinutes"
                      type="number" 
                      min="1" 
                      max="180"
                      class="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                    <span class="text-sm text-gray-600">minutes</span>
                  </div>
                  <button 
                    @click="startTimer"
                    :disabled="isTimerRunning"
                    :class="[
                      'px-4 py-2 rounded-md transition-colors',
                      isTimerRunning 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-amber-500 text-white hover:bg-amber-600'
                    ]"
                  >
                    {{ isTimerRunning ? 'Timer Running...' : 'Start Timer' }}
                  </button>
                  <button 
                    v-if="isTimerRunning"
                    @click="stopTimer"
                    class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Stop
                  </button>
                </div>
                <div v-if="isTimerRunning" class="mt-4">
                  <div class="text-2xl font-bold text-amber-500">{{ formatTime(timeRemaining) }}</div>
                  <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      class="bg-amber-500 h-2 rounded-full transition-all duration-1000"
                      :style="{ width: `${timerProgress}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="mt-12 bg-amber-50 rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity class="h-5 w-5 text-amber-500" />
              Nutrition Information
              <span class="text-sm font-normal text-gray-600">(per serving)</span>
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-amber-600">{{ recipe.nutrition.calories }}</div>
                <div class="text-sm text-gray-600">Calories</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-amber-600">{{ recipe.nutrition.protein }}g</div>
                <div class="text-sm text-gray-600">Protein</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-amber-600">{{ recipe.nutrition.carbs }}g</div>
                <div class="text-sm text-gray-600">Carbs</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-amber-600">{{ recipe.nutrition.fat }}g</div>
                <div class="text-sm text-gray-600">Fat</div>
              </div>
            </div>
          </div>
  
          <div class="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb class="h-5 w-5 text-blue-500" />
              Chef's Tips & Notes
            </h3>
            <ul class="space-y-2">
              <li v-for="(tip, index) in recipe.tips" :key="index" class="flex items-start gap-2">
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span class="text-gray-700">{{ tip }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </template>

<style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>