<template>
  <div>
    <ProxyPlot v-for="plot in store.dashboard" :key="plot.UUID" :plot="plot"></ProxyPlot>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const store = useDashboardStore()

const ProxyPlot = defineAsyncComponent(() => import('@/components/plot/index.vue'))
</script>
