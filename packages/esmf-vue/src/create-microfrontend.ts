import { MF } from "esmf-js";
import { Component, createApp } from "vue";

type App = ReturnType<typeof createApp>;

type Options<P> = {
  component: (props: P) => Component | Promise<Component>;
  init?: (app: App, props: P) => void | Promise<void>;
  meta?: Record<string, unknown>;
};

export function createMicroFrontend<P>(options: Options<P>): MF<P> {
  return {
    async mount(domElement: Element, props: P) {
      const app = createApp(await options.component(props));
      await options.init?.(app, props);
      app.mount(domElement);
      return () => app.unmount();
    },
    meta: options.meta,
  };
}
