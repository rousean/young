<template>
  <ElCollapse v-if="attrs.length" accordion @change="handleChange">
    <ElCollapseItem v-for="attr in attrs" :key="attr.label" :title="attr.label" :name="attr.label">
      <template v-if="collapses.includes(activeName)">
        <div class="item-wrapper" v-for="(child, i) in attr.children" :key="i" v-show="">
          <template v-for="item in child" :key="item.label">
            <div v-if="item.children">
              <ProxyAttribute :attr="item"></ProxyAttribute>
              <div class="item-wrapper" v-show="item.value" v-for="(element, j) in item.children" :key="j">
                <ProxyAttribute v-for="ele in element" :key="ele.label" :attr="ele"></ProxyAttribute>
              </div>
            </div>
            <ProxyAttribute v-else :attr="item"></ProxyAttribute>
          </template>
        </div>
      </template>
    </ElCollapseItem>
  </ElCollapse>
  <div class="no-config" v-else>暂无高级参数配置</div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { ElCollapse, ElCollapseItem, type CollapseModelValue } from 'element-plus'
import { useDashboardStore } from '@/stores/dashboard'
import { cloneDeep } from 'lodash'
import type { Style, Children, Attrs } from '@/types/global.type'

const ProxyAttribute = defineAsyncComponent(() => import('@/components/attribute/index.vue'))

const store = useDashboardStore()

const attrs = ref<Attrs[]>([])

const activeName = ref<string>('')

const collapses = computed<Array<string>>(() => attrs.value.map((attr) => attr.label))

const diff = ''

watch(attrs, (val) => {
  console.log(val)
})

watch(
  () => store.canvas.id,
  (val) => {
    if (!val) {
      attrs.value = []
      return
    }
    const style = store.canvas.style as Style
    let attribute = cloneDeep<Attrs[]>(store.canvas.attrs)
    attribute.forEach((attr) => (attr.children = handleChildren(attr.children as Children[], style)))
    attrs.value = attribute
  },
  {
    immediate: true
  }
)

const handleChange = (activeName: CollapseModelValue) => {
  console.log(activeName)
}

// 重新格式化配置
const handleChildren = (children: Children[], style: Style): Array<Children[]> => {
  let arr: Children[] = []
  return children.reduce((acc: Array<Children[]>, cur: Children, index: number, list: Children[]) => {
    cur.value = style[cur.name]
    // 嵌套子集  递归
    if (cur.children) {
      cur.children = handleChildren(cur.children as Children[], style)
    }
    if (cur.row) {
      arr.push(cur)
    } else {
      acc.push([cur])
      if (arr.length) {
        acc.push(arr)
        arr = []
      }
    }
    if (arr.length === 2) {
      acc.push(arr)
      arr = []
    }
    if (index === list.length - 1 && arr.length) {
      acc.push(arr)
    }
    return acc
  }, [])
}
</script>

<style lang="scss" scoped>
.item-wrapper {
  display: flex;
  margin-bottom: 10px;
  > div {
    flex: 1;
  }
}
.no-config {
  padding: 0 15px;
  color: var(--el-color-info-light-3);
  font-size: 12px;
}

:deep(.el-collapse-item__header) {
  padding: 0 10px;
  background: var(--el-fill-color-light);
}
:deep(.el-collapse-item__wrap, ) {
  background: var(--el-fill-color-light);
}
</style>
