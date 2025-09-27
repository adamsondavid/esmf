export type UnmountFn = () => void;

export type MF<P> = {
  mount: (domElement: Element, props: P) => Promise<UnmountFn>;
  meta: Record<string, unknown> | undefined;
};

export async function loadMicroFrontend<P = unknown>(moduleName: string): Promise<MF<P>> {
  const microFrontend = await import(moduleName);
  return microFrontend.default;
}
