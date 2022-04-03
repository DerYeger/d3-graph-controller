<script lang="ts">
import { GraphController } from 'd3-graph-controller'
import type {
  DemoGraph,
  DemoGraphConfig,
  DemoGraphController,
} from 'demo/src/model'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<DemoGraphConfig>,
      required: true,
    },
    graph: {
      type: Object as PropType<DemoGraph>,
      required: true,
    },
  },
  data() {
    return {
      controller: undefined as DemoGraphController | undefined,
      maxWeight: 5,
    }
  },
  watch: {
    config() {
      this.resetGraphController()
    },
    graph() {
      this.resetGraphController()
    },
    maxWeight(value: number) {
      this.controller.linkFilter = (link) => link.weight <= value
    },
  },
  mounted() {
    this.resetGraphController()
  },
  beforeUnmount() {
    this.controller?.shutdown()
  },
  methods: {
    resetGraphController(): void {
      this.controller?.shutdown()
      this.controller = new GraphController(
        this.$refs.graph,
        this.graph,
        this.config
      )
      this.maxWeight = 5
    },
  },
})
</script>

<template>
  <div class="container">
    <div class="settings card">
      <button @click="resetGraphController()">Reset</button>
      <div>
        <label for="maxWeight">Max. Weight: {{ maxWeight }}</label>
        <input
          id="maxWeight"
          v-model="maxWeight"
          type="range"
          min="0"
          max="5"
        />
      </div>
      <div>
        <span>Included Node Types</span>
        <div
          v-for="type of controller?.nodeTypes"
          :key="type"
          class="type-checkbox"
        >
          <input
            :id="`type-${type}`"
            type="checkbox"
            :checked="controller?.nodeTypeFilter.includes(type)"
            @change="
              controller?.filterNodesByType($event.currentTarget.checked, type)
            "
          />
          <label :for="`type-${type}`">{{ type }}</label>
        </div>
      </div>
    </div>
    <div ref="graph" class="card" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-grow: 1;
  gap: 1rem;
  max-width: 1280px;
  width: 100%;
}

.settings {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: fit-content;
  padding: 1rem;
}

.settings > div {
  width: 100%;
}

.settings input[type='range'] {
  width: 100%;
}

.type-checkbox {
  align-items: center;
  display: flex;
  gap: 0.25em;
}

.type-checkbox > label {
  text-transform: capitalize;
}

@media only screen and (max-width: 600px) {
  .container {
    flex-direction: column;
    max-height: unset;
  }

  .graph {
    flex-grow: 1;
    height: unset;
  }
}
</style>
