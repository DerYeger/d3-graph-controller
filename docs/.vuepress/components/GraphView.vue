<script lang="ts" setup>
import {
  GraphController,
  defineGraphConfig,
  defineNodeWithDefaults,
  Graph,
} from 'd3-graph-controller'
import { computed, onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import 'd3-graph-controller/default.css'

const props = defineProps<{
  graph: Graph
}>()

const { graph } = toRefs(props)

const el = ref<HTMLDivElement>()

const a = defineNodeWithDefaults({
  id: 'a',
  type: 'node',
  label: 'A',
})

const controller = ref<GraphController | undefined>()

onMounted(() => {
  resetGraphController()
})
onUnmounted(() => {
  controller.value?.shutdown()
})

watch(graph, resetGraphController)

function resetGraphController() {
  controller.value?.shutdown()
  if (!graph.value || !el.value) return
  controller.value = new GraphController(
    el.value!,
    graph.value,
    defineGraphConfig({
      autoResize: true,
    })
  )
}
</script>

<template>
  <div ref="el" />
</template>
