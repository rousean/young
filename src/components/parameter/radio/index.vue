<template>
  <div class="radio-wrapper">
    <div>{{ props?.config?.label }}</div>
    <ElRadioGroup v-model="modelValue">
      <ElRadio v-for="(value, key) in props?.config?.option" :key="value" :label="key">{{ value }}</ElRadio>
    </ElRadioGroup>
  </div>
</template>

<script setup lang="ts">
import { ElRadioGroup, ElRadio } from 'element-plus'
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
