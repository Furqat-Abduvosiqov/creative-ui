import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';

const EASE_OUT_EXPO = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Counts an element's number up from zero the first time it scrolls into view.
 *
 * The directive owns the element's text content — a count that ends on the
 * wrong number is worse than no count at all, so there is exactly one source
 * for the value and the final frame is pinned to it rather than to whatever
 * the easing happened to land on.
 */
@Directive({
  selector: '[appCountUp]',
})
export class CountUp {
  /** The value to land on. */
  readonly appCountUp = input.required<number>();

  /** How long the count takes, in milliseconds. */
  readonly countUpDuration = input(1600);

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly format = new Intl.NumberFormat();
  private frame = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const element = this.host.nativeElement;
      const target = this.appCountUp();

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        element.textContent = this.format.format(target);

        return;
      }

      element.textContent = this.format.format(0);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            return;
          }

          observer.disconnect();
          this.run(element, target);
        },
        { threshold: 0, rootMargin: '0px 0px -15% 0px' },
      );

      observer.observe(element);

      destroyRef.onDestroy(() => {
        observer.disconnect();
        cancelAnimationFrame(this.frame);
      });
    });
  }

  private run(element: HTMLElement, target: number): void {
    const duration = this.countUpDuration();
    let started = 0;

    const step = (now: number) => {
      started ||= now;

      const progress = Math.min((now - started) / duration, 1);

      element.textContent = this.format.format(Math.round(target * EASE_OUT_EXPO(progress)));

      if (progress < 1) {
        this.frame = requestAnimationFrame(step);
      }
    };

    this.frame = requestAnimationFrame(step);
  }
}
