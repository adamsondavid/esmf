export type UnmountFn = () => void;

export type MF<P> = {
  mount: (domElement: Element, props: P) => Promise<UnmountFn>;
  meta: Record<string, unknown> | undefined;
};

export async function loadMicroFrontend<P = unknown>(moduleName: string): Promise<MF<P>> {
  const microfrontend = await import(moduleName);
  return microfrontend.default;
}
