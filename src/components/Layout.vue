<script setup>
import Footer from './Footer.vue';
import Header from './Header.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
        <main class="flex-grow">
        <slot></slot>
        </main>
    <Footer />
  </div>
</template>
