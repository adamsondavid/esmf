export type MF<P> = {
  mount(domElement: Element, props: P): void;
  unmount(): void;
};

export async function mountMicrofrontend<P>(name: string, domElement: Element, props: P): Promise<MF<P>> {
  const microfrontend = (await import(name)).default as MF<P>;
  microfrontend.mount(domElement, props);
  return microfrontend;
}
