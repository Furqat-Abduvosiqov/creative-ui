import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';

import { Magnetic } from '../../shared/magnetic';
import { Parallax } from '../../shared/parallax';

/** Longest the entrance will wait on webfonts before starting regardless. */
const FONT_GRACE_MS = 900;

@Component({
  selector: 'app-hero',
  imports: [Magnetic, Parallax],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  host: {
    id: 'top',
    '[class.is-ready]': 'ready()',
  },
})
export class Hero {
  protected readonly ready = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // The headline is set in a display face that arrives over the network.
      // Starting the entrance before it lands animates the fallback and then
      // swaps mid-flight, which reads as a bug. Waiting for the font — but
      // never longer than the grace period — makes the reveal land once.
      const timer = setTimeout(() => this.ready.set(true), FONT_GRACE_MS);

      // The grace timer is scheduled first and deliberately not conditional: if
      // the Font Loading API is missing or throws, the hero still arrives.
      try {
        void document.fonts.ready.then(() => {
          clearTimeout(timer);
          this.ready.set(true);
        });
      } catch {
        // Falls through to the timer.
      }

      destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }
}
