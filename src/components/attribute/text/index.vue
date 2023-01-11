<template>
  <div class="text-wrapper">
    <div>{{ props?.config?.label }}</div>
    <ElInput v-model="modelValue"></ElInput>
  </div>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
import { ref } from 'vue'

const props = defineProps({
  config: {
    type: Object
  }
})

const modelValue = ref(props?.config?.value)
</script>

<style lang="scss" scoped>
.text-wrapper {
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
