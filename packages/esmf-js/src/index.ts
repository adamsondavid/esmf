export type MF<P> = {
  mount(domElement: Element, props?: P): void;
  unmount(): void;
};

export type Options<P> = {
  moduleName: string;
  domElement: Element;
  props?: P;
};

export async function mountMicrofrontend<P>(opts: Options<P>): Promise<MF<P>> {
  // TODO: return undefined if import fails
  // TODO: write status of apps into a globally exported data structure
  const microfrontend = (await import(opts.moduleName)).default as MF<P>;
  microfrontend.mount(opts.domElement, opts.props);
  return microfrontend;
}
