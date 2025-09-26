import React, { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import { loadMicroFrontend, UnmountFn } from "esmf-js";

type MicroFrontendProps<P> = {
  moduleName: string;
  props?: P;
  onLoaded?: (meta?: Record<string, unknown>) => void;
  onMounted?: () => void;
  onError?: (error: unknown) => void;
  children?: ReactNode;
  errorComponent?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function MicroFrontend<P = unknown>({
  moduleName,
  props,
  onLoaded,
  onMounted,
  onError,
  children,
  errorComponent,
  ...rest
}: MicroFrontendProps<P>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const unmountRef = useRef<UnmountFn>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ok">("loading");

  useEffect(() => {
    setStatus("loading");

    (async () => {
      try {
        const mf = await loadMicroFrontend(moduleName);
        onLoaded?.(mf.meta);

        setStatus("ok");
        await new Promise((r) => setTimeout(r, 2));

        unmountRef.current = await mf.mount(rootRef.current!, props);
        onMounted?.();
      } catch (e) {
        setStatus("error");
        if (!onError) console.error(`[esmf] Failed to bootstrap micro-frontend: ${moduleName}\n`, e);
        onError?.(e);
      }
    })();

    return () => unmountRef.current?.();
  }, [moduleName, props]);

  return (
    <>
      {status === "ok" && <div ref={rootRef} {...rest} />}
      {status === "loading" && <div {...rest}>{children}</div>}
      {status === "error" && <div {...rest}>{errorComponent}</div>}
    </>
  );
}
