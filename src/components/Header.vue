<script setup lang="ts">
import { Utensils } from 'lucide-vue-next';

</script>

<template>
    <header class="container mx-auto px-4 py-6 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <Utensils class="h-6 w-6 text-amber-500" />
        <span class="font-bold text-xl">Save My Dinner</span>
      </div>
      <nav class="hidden md:flex items-center gap-6">
        <router-link to="/" class="text-gray-600 hover:text-amber-500 transition-colors">Home</router-link>
        <router-link to="/recipes" class="text-gray-600 hover:text-amber-500 transition-colors">Recipes</router-link>
      </nav>
      <button class="md:hidden">
        <Utensils class="h-5 w-5" />
      </button>
    </header>
</template>