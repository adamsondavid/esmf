import { MF } from "esmf-js";
import { createApp } from "vue";

export { default as MicroFrontend } from "./micro-frontend.vue";

type App = ReturnType<typeof createApp>;

export type Options<P> = {
  component: any;
  init(app: App, props: P): void;
};

export function createMicrofrontend<P>(opts: Options<P>): MF<P> {
  let app: App;
  return {
    mount(domElement: Element, props: P) {
      app = createApp(opts.component);
      opts.init(app, props);
      app.mount(domElement);
    },
    unmount() {
      app.unmount();
    },
  };
}
