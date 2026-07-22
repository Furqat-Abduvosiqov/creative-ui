import { computed, effect, Service, signal } from '@angular/core';

export type ThemeChoice = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'creative-ui.theme';

/**
 * Resolves the active theme from the OS preference and the visitor's explicit
 * choice, and stamps it onto the root element for the token layer to read.
 *
 * Only a theme name is persisted — it is a display preference, not personal
 * data, and nothing else in this app touches storage.
 */
@Service()
export class Theme {
  private readonly query = matchMedia('(prefers-color-scheme: dark)');
  private readonly systemDark = signal(this.query.matches);
  private readonly choice = signal<ThemeChoice>(restore());

  readonly isDark = computed(() =>
    this.choice() === 'system' ? this.systemDark() : this.choice() === 'dark',
  );

  constructor() {
    this.query.addEventListener('change', (event) => this.systemDark.set(event.matches));

    effect(() => {
      const choice = this.choice();
      const root = document.documentElement;

      // Deliberately cleared rather than set to "system": the tokens fall back
      // to the prefers-color-scheme media query only when no attribute is
      // present, so leaving one behind would pin the theme forever.
      if (choice === 'system') {
        delete root.dataset['theme'];
      } else {
        root.dataset['theme'] = choice;
      }

      persist(choice);
    });
  }

  /** Flips to the opposite of what is currently on screen, whatever chose it. */
  toggle(): void {
    this.choice.set(this.isDark() ? 'light' : 'dark');
  }
}

function restore(): ThemeChoice {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    return stored === 'light' || stored === 'dark' ? stored : 'system';
  } catch {
    // Private-mode browsers throw on access rather than returning null.
    return 'system';
  }
}

function persist(choice: ThemeChoice): void {
  try {
    if (choice === 'system') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, choice);
    }
  } catch {
    // A visitor who blocks storage still gets a working toggle for this visit.
  }
}
