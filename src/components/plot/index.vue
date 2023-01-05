<template>
  <component :is="currentComponent" :plot="plot" style="border: 1px solid #000; position: absolute"></component>
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
