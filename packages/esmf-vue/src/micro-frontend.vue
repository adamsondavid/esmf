<script lang="ts" setup generic="P">
import { loadMicroFrontend, UnmountFn } from "esmf-js";
import { computed, getCurrentInstance, nextTick, onUnmounted, ref, watch } from "vue";

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

    status.value = "ok";
    await nextTick();

    unmount = await mf.mount(root.value, props.props);
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
  <div v-if="status === 'ok'" ref="root" v-bind="$attrs" />
  <div v-if="status === 'loading'" v-bind="$attrs">
    <slot name="default" />
  </div>
  <div v-if="status === 'error'" v-bind="$attrs">
    <slot name="error" />
  </div>
</template>
