<template>
  <component class="plot-wrapper" :is="currentComponent" :plot="plot"></component>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
const props = defineProps({
  plot: {
    type: Object,
    required: true
  }
})

const currentComponent = defineAsyncComponent(() => import(/* @vite-ignore */ `./${props.plot.type}/index.vue`))
const left = computed(() => `${props.plot.x}px`)
const top = computed(() => `${props.plot.y}px`)
</script>

<style lang="scss" scoped>
.plot-wrapper {
  position: absolute;
  top: v-bind(top);
  left: v-bind(left);
  border: 1px solid #000;
}
</style>
