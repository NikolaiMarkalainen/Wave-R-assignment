<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NPageHeader, NAvatar, NIcon, NFlex } from 'naive-ui'
import { PeopleOutline } from '@vicons/ionicons5'
</script>

<template>
  <n-flex justify="center" align="center" style="width: 100%">
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
      <n-breadcrumb separator="-" style="padding-bottom: 1rem; padding-left: 2rem">
        <n-breadcrumb-item>
          <router-link to="/login">Login</router-link>
        </n-breadcrumb-item>
        <n-breadcrumb-item>
          <router-link to="/">Home</router-link>
        </n-breadcrumb-item>
      </n-breadcrumb>
    </n-page-header>
  </n-flex>
</template>

<style scoped>
.header-parent {
  display: flex;
  flex: 1;
  padding-top: 1rem;
  padding-left: 2.5rem;
  background: linear-gradient(
    135deg,
    rgba(42, 123, 155, 1) 0%,
    rgba(87, 199, 133, 1) 50%,
    rgba(237, 221, 83, 1) 100%
  );
}
@media (max-width: 720px) {
  .header-parent {
    height: 15vh;
  }
}
</style>
