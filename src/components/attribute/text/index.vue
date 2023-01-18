<template>
  <div class="text-wrapper">
    <div>{{ props?.attr?.label }}</div>
    <ElInput v-model="modelValue"></ElInput>
  </div>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
import { computed } from 'vue'

const props = defineProps({
  attr: {
    type: Object
  }
})

const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
  get() {
    return props?.attr?.value
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>

<style lang="scss" scoped>
.text-wrapper {
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 12px;
  > :nth-child(1) {
    width: 75px;
  }
  > :nth-child(2) {
    width: 80px;
  }
}
</style>
