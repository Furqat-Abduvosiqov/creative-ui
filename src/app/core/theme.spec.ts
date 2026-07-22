import { TestBed } from '@angular/core/testing';

import { Theme } from './theme';

/** Replaces the global stub so a test can decide what the OS prefers. */
function systemPrefersDark(prefersDark: boolean): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: prefersDark && query.includes('dark'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  });
}

describe('Theme', () => {
  beforeEach(() => {
    delete document.documentElement.dataset['theme'];
    localStorage.clear();
  });

  afterEach(() => {
    delete document.documentElement.dataset['theme'];
  });

  it('should follow the system preference before anyone chooses', () => {
    systemPrefersDark(true);

    const theme = TestBed.inject(Theme);
    TestBed.tick();

    expect(theme.isDark()).toBe(true);
    // No attribute, so the prefers-color-scheme media query stays in charge.
    expect(document.documentElement.dataset['theme']).toBeUndefined();
  });

  // The regression this file exists for: forcing light on a dark-preferring OS
  // has to actually stamp `light`. A previous version only overrode
  // `color-scheme` for that case, so the toggle reported light while every
  // colour token stayed dark.
  it('should stamp light when toggled against a dark system preference', () => {
    systemPrefersDark(true);

    const theme = TestBed.inject(Theme);
    TestBed.tick();

    theme.toggle();
    TestBed.tick();

    expect(theme.isDark()).toBe(false);
    expect(document.documentElement.dataset['theme']).toBe('light');
  });

  it('should stamp dark when toggled against a light system preference', () => {
    systemPrefersDark(false);

    const theme = TestBed.inject(Theme);
    TestBed.tick();

    theme.toggle();
    TestBed.tick();

    expect(theme.isDark()).toBe(true);
    expect(document.documentElement.dataset['theme']).toBe('dark');
  });

  it('should restore a previously chosen theme', () => {
    systemPrefersDark(true);
    localStorage.setItem('creative-ui.theme', 'light');

    const theme = TestBed.inject(Theme);
    TestBed.tick();

    expect(theme.isDark()).toBe(false);
    expect(document.documentElement.dataset['theme']).toBe('light');
  });
});
