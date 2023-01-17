<template>
  <div class="number-wrapper">
    <div>{{ props?.config?.label }}</div>
    <ElInputNumber v-model="modelValue"></ElInputNumber>
  </div>
</template>

<script setup lang="ts">
import { ElInputNumber } from 'element-plus'
import { computed } from 'vue'

const props = defineProps({
  config: {
    type: Object
  }
})

const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
  get() {
    return props?.config?.value
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>

<style lang="scss" scoped>
.number-wrapper {
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
