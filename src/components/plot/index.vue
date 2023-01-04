<template>
  <component :is="currentComponent"></component>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const props = defineProps({
  plot: {
    type: Object,
    required: true
  }
})

const currentComponent = defineAsyncComponent(() => import(/* @vite-ignore */ `./${props.plot.type}/index.vue`))
</script>
