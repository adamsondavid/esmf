import { MF } from "esmf-js";
import { Component, createApp } from "vue";

type App = ReturnType<typeof createApp>;

type Options<P> = {
  component: Component | Promise<Component> | ((props: P) => Component) | ((props: P) => Promise<Component>);
  init?: (app: App, props: P) => void;
  meta?: Record<string, unknown>;
};

export function createMicroFrontend<P>(options: Options<P>): MF<P> {
  return {
    mount(domElement: Element, props: P) {
      const app = createApp(options.component);
      options.init?.(app, props);
      app.mount(domElement);
      return () => app.unmount();
    },
    meta: options.meta,
  };
}
