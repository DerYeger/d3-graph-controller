<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import 'd3-graph-controller/default.css'

const props = defineProps<{
  graph: Graph
}>()

const { graph } = toRefs(props)

const el = ref<HTMLDivElement>()

const controller = ref(undefined)

onMounted(() => {
  resetGraphController()
})
onUnmounted(() => {
  controller.value?.shutdown()
})

watch(graph, resetGraphController)

async function resetGraphController() {
  const { defineGraphConfig, GraphController } = await import(
    'd3-graph-controller'
  )
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
