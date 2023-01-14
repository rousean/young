<template>
  <ElCard class="canvas-context" v-show="store.canvas.context">
    <div class="btn-wtapper">
      <ElButton class="btn" text>复制</ElButton>
      <ElButton class="btn" text>删除</ElButton>
      <ElButton class="btn" text>置顶</ElButton>
    </div>
  </ElCard>
</template>

<script setup lang="ts">
import { ElCard, ElButton } from 'element-plus'
import { ref } from 'vue'
import emitter from '@/mitt/index'
import { useDashboardStore } from '@/stores/dashboard'
const store = useDashboardStore()
const x = ref<string>('0px')
const y = ref<string>('0px')

emitter.on('context-show', (e: any) => {
  store.canvas.context = true
  x.value = e.x
  y.value = e.y
})
</script>

<style lang="scss" scoped>
.canvas-context {
  position: absolute;
  top: v-bind(y);
  left: v-bind(x);
  width: 120px;
  z-index: 100;
  .btn-wtapper {
    display: flex;
    flex-direction: column;
    .btn {
      margin-left: 0;
    }
  }
  :deep(.el-card__body) {
    padding: 5px;
  }
}
</style>
