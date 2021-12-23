<template>
  <div class="flex flex-col items-center" p="t-10 md:t-20 b-10">
    <header class="flex flex-col items-center">
      <img src="/logo.svg" h="40" />
      <h1>d3-graph-controller</h1>
      <p text="1.2em center" class="leading-7 op60 font-normal tracking-wide">
        A TypeScript library for visualizing and simulating directed,
        interactive graphs.
      </p>
    </header>
    <div
      class="text-center flex flex-col sm:flex-row flex-wrap items-center gap-4 mt-5 children:my0"
    >
      <a class="btn bg-yellow600 hover:bg-yellow700 saturate-80" href="/guide/">
        <span>Guide</span>
      </a>
      <a class="btn bg-lime600 hover:bg-lime700 saturate-80" href="/demo/">
        <span>Demo</span>
      </a>
    </div>
    <FeatureList class="max-w-140 text-lg" />
  </div>
</template>
