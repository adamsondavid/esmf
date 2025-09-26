<script lang="ts" setup generic="P">
import { loadMicroFrontend, UnmountFn } from "esmf-js";
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{ moduleName: string; props?: P }>();

const root = ref();

let unmount: UnmountFn | undefined;

onMounted(async () => {
  const mf = await loadMicroFrontend(props.moduleName);
  // TODO: emit mounted event with mf.meta as payload
  unmount = await mf.mount(root.value, props.props);
});

onUnmounted(() => {
  unmount?.();
});
</script>

<template>
  <div ref="root" />
</template>
