/**
 * jsdom implements neither `matchMedia` nor `IntersectionObserver`, and this app
 * leans on both — for reduced-motion and pointer checks, and for every
 * scroll-triggered entrance. Stubbing them here keeps the gap in the test
 * environment rather than pushing defensive checks into production code.
 *
 * The media stub reports "no preference" for everything, which is the default a
 * browser reports too, so components under test take their normal path.
 */

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList,
});

// Deliberately not `implements IntersectionObserver`: the DOM lib keeps adding
// members to that interface, and a test stub should not break the build every
// time TypeScript ships a newer one.
class NoopIntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly scrollMargin = '';
  readonly thresholds: readonly number[] = [];

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: NoopIntersectionObserver,
});
