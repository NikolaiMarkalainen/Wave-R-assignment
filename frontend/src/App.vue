<script setup lang="ts">
import PageHeader from './components/PageHeader.vue'
import { NConfigProvider } from 'naive-ui'
import 'vfonts/Roboto.css'
</script>

<template>
  <n-config-provider
    :theme-overrides="{
      common: { textColor1: 'black', textColor2: 'black', textColor3: 'black' },
      DataTable: {
        tdColor: 'rgba(87, 199, 133, 1)',
        tdColorHover: 'rgba(237, 221, 83, 1',
        thColor: 'rgba(42, 123, 155, 1',
        tdColorSorting: 'rgba(42, 123, 155, 1',
      },
      Tabs: {
        tabTextColorHover: 'white',
        barColor: 'rgba(237, 221, 83, 1',
        tabTextColorActiveBar: 'rgba(237, 221, 83, 1',
        tabTextColorHoverBar: 'rgba(237, 221, 83, 1',
      },
    }"
  >
    <page-header></page-header>
    <router-view />
  </n-config-provider>
</template>

<style>
html,
body,
#app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin: 0;
  background: linear-gradient(135deg, #1e1e2f, #121217);
  overflow-x: hidden;
}
</style>
