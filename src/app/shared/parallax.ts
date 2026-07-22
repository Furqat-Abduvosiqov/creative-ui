import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

/**
 * Publishes the element's position in the viewport as `--parallax`: `1` when its
 * centre is at the top of the screen, `0` when centred, `-1` at the bottom.
 *
 * The directive deliberately does not move anything itself. It reports where
 * the element is and each stylesheet decides what that should mean — one row
 * translates, another rotates, a third does nothing at all below a breakpoint.
 *
 * Scroll is handled with a native passive listener and coalesced to one write
 * per frame; routing it through Angular's event bindings would trigger change
 * detection on every scroll event.
 */
@Directive({
  selector: '[appParallax]',
})
export class Parallax {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private frame = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const element = this.host.nativeElement;

      const measure = () => {
        this.frame = 0;

        const box = element.getBoundingClientRect();
        const viewport = window.innerHeight;

        // Nothing offscreen can be seen moving, so don't pay to move it.
        if (box.bottom < 0 || box.top > viewport) {
          return;
        }

        const progress = 1 - (2 * (box.top + box.height / 2)) / viewport;

        element.style.setProperty('--parallax', progress.toFixed(4));
      };

      const schedule = () => {
        this.frame ||= requestAnimationFrame(measure);
      };

      measure();
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });

      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        cancelAnimationFrame(this.frame);
      });
    });
  }
}
