import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';

import { Theme } from '../../core/theme';

interface NavLink {
  readonly href: string;
  readonly label: string;
}

/** The scroll depth, in pixels, at which the header stops floating. */
const STUCK_AFTER = 16;

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  host: {
    '[class.is-stuck]': 'stuck()',
  },
})
export class SiteHeader {
  protected readonly theme = inject(Theme);
  protected readonly stuck = signal(false);

  protected readonly links: readonly NavLink[] = [
    { href: '#work', label: 'Work' },
    { href: '#craft', label: 'Craft' },
    { href: '#process', label: 'Process' },
  ];

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // A native listener again, but the signal is only written when the state
      // actually flips — so this costs one render pass per crossing, not one
      // per scroll event.
      const onScroll = () => this.stuck.set(window.scrollY > STUCK_AFTER);

      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }
}
