<script lang="ts" setup generic="P">
import { type MF, mountMicrofrontend } from "esmf-js";
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{ moduleName: string; props?: P }>();

const root = ref();

let mf: MF<P> | undefined;

onMounted(async () => {
  mf = await mountMicrofrontend({
    moduleName: props.moduleName,
    domElement: root.value,
    props: props.props,
  });
});

onUnmounted(() => {
  mf?.unmount();
});
</script>

<template>
  <div ref="root" />
</template>
