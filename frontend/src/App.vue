<script setup lang="ts">
import PageHeader from './components/PageHeader.vue'
</script>

<template>
  <page-header></page-header>
  <router-view />
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #1e1e2f, #121217);
}
</style>
