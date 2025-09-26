import React from "react";
import { MicroFrontend } from "esmf-react";

export function App() {
  return (
    <>
      <h1>Container</h1>
      <MicroFrontend moduleName="microfrontend-vue" />
      <MicroFrontend moduleName="microfrontend-react" />

      <MicroFrontend moduleName="microfrontend-react" id="hello" errorComponent="failed to load microfrontend-react">
        loading...
      </MicroFrontend>
    </>
  );
}
