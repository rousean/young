<template>
  <div class="radio-wrapper">
    <div>{{ props?.config?.label }}</div>
    <ElSlider v-model="modelValue" show-input></ElSlider>
  </div>
</template>

<script setup lang="ts">
import { ElSlider } from 'element-plus'
import { ref } from 'vue'

const props = defineProps({
  config: {
    type: Object
  }
})

const modelValue = ref(props?.config?.value)
</script>

<style lang="scss" scoped>
.radio-wrapper {
  display: flex;
  align-items: center;
  padding: 0 10px;
  > :nth-child(1) {
    flex: 1;
  }
  > :nth-child(2) {
    flex: 2;
  }
}
</style>
