export type UnmountFn = () => void;

export type MF<P> = {
  mount: (domElement: Element, props: P) => UnmountFn;
  meta: Record<string, unknown> | undefined;
};

export async function loadMicroFrontend<P = unknown>(moduleName: string): Promise<MF<P>> {
  // TODO: maybe return undefined if import fails??
  // TODO: maybe write status of apps into a globally exported data structure??
  const microfrontend = await import(moduleName);
  return microfrontend.default;
}
