<template>
  <component :is="currentComponent" :attr="attr"></component>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const props = defineProps({
  attr: {
    type: Object,
    required: true
  }
})

const currentComponent = defineAsyncComponent(() => import(`./${props.attr.type}/index.vue`))
</script>
