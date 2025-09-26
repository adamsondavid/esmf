<script lang="ts" setup>
import { MicroFrontend } from "esmf-vue";
</script>

<template>
  <h1>Container</h1>
  <MicroFrontend moduleName="http://localhost:3001/src/esmf.main.ts" />
  <MicroFrontend moduleName="http://localhost:3001/src/esmf.main.ts" />
</template>
