<template>
  <div class="radio-wrapper">
    <div>{{ props?.config?.label }}</div>
    <ElSelect v-model="modelValue">
      <ElOption v-for="(value, key) in props?.config?.option" :key="value" :label="key" :value="value"></ElOption>
    </ElSelect>
  </div>
</template>

<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'
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
