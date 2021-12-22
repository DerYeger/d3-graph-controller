<template>
  <DemoHeader />
  <GraphComponent />
</template>
<script>
import DemoHeader from './DemoHeader.vue'
import GraphComponent from './GraphComponent.vue'

export default {
  components: { GraphComponent, DemoHeader },
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
