import React from "react";
import { createMicroFrontend } from "esmf-react";
import { App } from "./app";

export default createMicroFrontend({
  component: () => <App />,
});
