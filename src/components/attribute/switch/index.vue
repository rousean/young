<template>
  <div class="switch-wrapper">
    <div>{{ props?.attr?.label }}</div>
    <ElSwitch v-model="modelValue"></ElSwitch>
  </div>
</template>

<script setup lang="ts">
import { ElSwitch } from 'element-plus'
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const store = useDashboardStore()

const props = defineProps({
  attr: {
    type: Object
  }
})

const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
  get() {
    return props.attr?.value
  },
  set(val) {
    store.canvas.style[props.attr?.name] = val
    // emit('update:modelValue', val)
  }
})
</script>

<style lang="scss" scoped>
.switch-wrapper {
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
