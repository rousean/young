<template>
  <svg :class="svgClass" :style="svgStyle" aria-hidden="true" v-bind="$attrs">
    <use :href="icon"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  className?: string
  size?: string
  color?: string
}

const props = defineProps<Props>()

const icon = computed<string>(() => `#icon-${props.name}`)

const svgClass = computed<string>(() => `svg-icon ${props.className ?? ''}`)

const svgStyle = computed<string>(() => (props.size ? `width: ${props.size}px; height: ${props.size}px;` : '' + props.color ? `color: ${props.color};` : ''))
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
