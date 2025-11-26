<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NPageHeader, NAvatar, NIcon } from 'naive-ui'
import { PeopleOutline } from '@vicons/ionicons5'
</script>

<template>
  <n-page-header class="header-parent">
    <template #title> User Management system </template>
    <template #avatar>
      <n-avatar
        :style="{
          backgroundColor: 'transparent',
        }"
      >
        <n-icon :component="PeopleOutline" color="black"></n-icon>
      </n-avatar>
    </template>
    <n-breadcrumb separator="-" :style="{ paddingBottom: '0.5rem' }">
      <n-breadcrumb-item>
        <router-link to="/login">Login</router-link>
      </n-breadcrumb-item>
      <n-breadcrumb-item>
        <router-link to="/">Home</router-link>
      </n-breadcrumb-item>
    </n-breadcrumb>
  </n-page-header>
</template>

<style scoped>
.header-parent {
  padding-top: 1rem;
  padding-left: 2.5rem;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(42, 123, 155, 1) 0%,
    rgba(87, 199, 133, 1) 50%,
    rgba(237, 221, 83, 1) 100%
  );
}
</style>
