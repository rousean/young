<template>
  <component class="plot-wrapper" :is="currentComponent" :plot="plot"></component>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
const store = useDashboardStore()
const props = defineProps({
  plot: {
    type: Object,
    required: true
  }
})
const currentComponent = defineAsyncComponent(() => import(`./${props.plot.type}/index.vue`))
const border = computed(() => (props.plot.id === store.canvas.id ? '1px dashed var(--el-color-primary)' : ''))
</script>

<style lang="scss" scoped>
.plot-wrapper {
  // border: 1px solid red;
  cursor: move;
}
</style>
