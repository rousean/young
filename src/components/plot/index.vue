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
const left = computed(() => `${props.plot.x}px`)
const top = computed(() => `${props.plot.y}px`)
const border = computed(() => (props.plot.id === store.id ? '1px dashed var(--el-color-primary)' : ''))
</script>

<style lang="scss" scoped>
.plot-wrapper {
  position: absolute;
  top: v-bind(top);
  left: v-bind(left);
  // border: v-bind(border);
  cursor: move;
}
</style>
