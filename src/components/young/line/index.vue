<template>
  <div :id="id">折线图</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  plot: {
    type: Object,
    required: true
  }
})
const id = computed(() => `Young-${props.plot.id}`)
</script>

<style lang="scss" scoped></style>
