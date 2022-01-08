<template>
  <div id="projects">
    <h2>Used In</h2>
    <section>
      <div v-for="project of projects" :key="project.name" class="project">
        <h3>
          <a href="https://vitest.dev/" target="_blank" rel="noopener">
            <img :src="project.logo" :alt="project.name" class="logo" />
            {{ project.name }}
          </a>
        </h3>
        <p class="description">
          {{ project.description }}
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
interface Project {
  name: string
  logo: string
  description: string
}

const projects: Project[] = [
  {
    name: 'Vitest',
    description: 'Visualization of interactive module graphs.',
    logo: 'https://vitest.dev/logo.svg',
  },
]
</script>

<style scoped>
#projects {
  margin-top: 40px;
}

#projects > h2 {
  text-align: center;
  border-bottom: none;
  border-top: 1px solid var(--c-border);
  padding-top: 2.5rem;
}

#projects > section {
  align-content: stretch;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1.2rem 0;
}

.project {
  align-items: center;
  display: flex;
  flex-basis: 30%;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  max-width: 30%;
}

.project > h3 {
  border-bottom: none;
  font-size: 1.25rem;
  margin: 0;
  padding: 0;
}

.project > h3 > a {
  align-items: center;
  display: flex;
  gap: 0.5em;
}

.project .logo {
  width: 2rem;
  height: 2rem;
}

.project .description {
  color: var(--c-text-lighter);
  text-align: center;
}

@media (max-width: 719px) {
  #projects > section {
    flex-direction: column;
  }

  .project {
    max-width: 100%;
    padding: 0 2.5rem;
  }
}
</style>
