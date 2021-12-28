<template>
  <DemoHeader />
  <GraphComponent :config="config" :graph="graph" />
</template>
<script>
import { demoGraph, demoGraphConfig } from '@demo/src/model'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      config: demoGraphConfig,
      graph: demoGraph,
    }
  },
})
</script>
