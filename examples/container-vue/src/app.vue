<script lang="ts" setup>
import { MicroFrontend } from "esmf-vue";
</script>

<template>
  <h1>Container</h1>
  <MicroFrontend moduleName="microfrontend-vue" />
  <MicroFrontend moduleName="microfrontend-react" />

  <MicroFrontend moduleName="microfrontend-react" id="hello">
    loading...
    <template #error>failed to load microfrontend-react</template>
  </MicroFrontend>
</template>
