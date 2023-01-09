<template>
  <component :is="currentComponent" :config="config"></component>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const props = defineProps({
  config: {
    type: Object,
    required: true
  }
})

const currentComponent = defineAsyncComponent(() => import(`./${props.config.type}/index.vue`))
</script>
