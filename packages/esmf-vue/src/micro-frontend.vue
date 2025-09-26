<script lang="ts" setup generic="P">
import { loadMicroFrontend, UnmountFn } from "esmf-js";
import { computed, getCurrentInstance, onUnmounted, ref, watch } from "vue";

const props = defineProps<{ moduleName: string; props?: P }>();
const emit = defineEmits<{
  loaded: [meta?: Record<string, unknown>];
  mounted: [];
  error: [error: unknown];
}>();

const errorListenerPresent = computed(() => !!getCurrentInstance()?.vnode.props?.error);

let unmount: UnmountFn | undefined;
const root = ref();
const status = ref<"loading" | "error" | "ok">("loading");

async function mountMicroFrontend() {
  unmount?.(); // clean up previous instance
  status.value = "loading";

  try {
    const mf = await loadMicroFrontend(props.moduleName);
    emit("loaded", mf.meta);
    unmount = await mf.mount(root.value, props.props);
    status.value = "ok";
    emit("mounted");
  } catch (e) {
    status.value = "error";
    if (!errorListenerPresent.value)
      console.error(`[esmf] Failed to bootstrap micro-frontend: ${props.moduleName}\n`, e);
    emit("error", e);
  }
}

watch(() => [props.moduleName, props.props], mountMicroFrontend, { immediate: true });

onUnmounted(() => {
  unmount?.();
});
</script>

<template>
  <div ref="root">
    <slot v-if="status === 'loading'" name="default" />
    <slot v-if="status === 'error'" name="error" />
  </div>
</template>
