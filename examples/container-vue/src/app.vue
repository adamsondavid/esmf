<script lang="ts" setup>
import { MicroFrontend } from "esmf-vue";
</script>

<template>
  <h1>Container</h1>
  <MicroFrontend moduleName="microfrontend-vue" id="hello">
    <div>loading...</div>
    <template #error>
      <div>failed to load microfrontend-vue</div>
    </template>
  </MicroFrontend>
  <MicroFrontend moduleName="microfrontend-vue" />
</template>
