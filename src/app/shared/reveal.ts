import {
  afterNextRender,
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * Reveals an element the first time it scrolls into view.
 *
 * The directive owns *when*; `.reveal` / `.is-revealed` in the global stylesheet
 * own *what it looks like*. Keeping those apart is what stops every section
 * inventing its own entrance.
 *
 * Bind a number to stagger a group: `[appReveal]="i * 80"`.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.is-revealed]': 'revealed()',
    '[style.--reveal-delay]': 'delay()',
  },
})
export class Reveal {
  /** Delay in milliseconds before this element starts its entrance. */
  readonly appReveal = input<number | string>(0);

  protected readonly revealed = signal(false);
  protected readonly delay = computed(() => `${Number(this.appReveal()) || 0}ms`);

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // Nothing to reveal if the visitor has asked for less motion — the
      // content is simply already there.
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.revealed.set(true);

        return;
      }

      // threshold 0 with a negative bottom margin, not a fractional threshold:
      // a section taller than the viewport can never reach 15% visibility, and
      // would stay invisible forever.
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            return;
          }

          this.revealed.set(true);
          observer.disconnect();
        },
        { threshold: 0, rootMargin: '0px 0px -10% 0px' },
      );

      observer.observe(this.host.nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
