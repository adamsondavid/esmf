import { MF } from "esmf-js";
import React from "react";
import { createRoot } from "react-dom/client";

type Options<P> = {
  component: (props: P) => React.JSX.Element | Promise<React.JSX.Element>;
  meta?: Record<string, unknown>;
};

export function createMicroFrontend<P>(options: Options<P>): MF<P> {
  return {
    async mount(domElement: Element, props: P) {
      const root = createRoot(domElement);
      root.render(await options.component(props));
      return () => root.unmount();
    },
    meta: options.meta,
  };
}
