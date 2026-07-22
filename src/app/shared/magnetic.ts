import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Pulls an element slightly toward the pointer while it is hovered, then lets
 * it settle back. Exposes `--mx` / `--my` for the host's own stylesheet to use,
 * so each call site decides whether that means a translate, a skew, or nothing.
 *
 * Listeners are attached natively rather than through Angular's `host` bindings
 * on purpose: a `(pointermove)` binding marks the component dirty on every
 * event, which under zoneless change detection means a render pass at pointer
 * frequency. This writes to the DOM directly and never involves the framework.
 */
@Directive({
  selector: '[appMagnetic]',
})
export class Magnetic {
  /** How far the element may travel, as a fraction of its own half-size. */
  readonly appMagnetic = input<number | string>(0.32);

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private frame = 0;
  private targetX = 0;
  private targetY = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const element = this.host.nativeElement;

      // A magnetic pull is meaningless without a pointer to be pulled toward,
      // and unwelcome to anyone who asked for reduced motion.
      if (
        matchMedia('(pointer: coarse)').matches ||
        matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      const onMove = (event: PointerEvent) => {
        const box = element.getBoundingClientRect();
        const strength = Number(this.appMagnetic()) || 0;

        this.targetX = (event.clientX - (box.left + box.width / 2)) * strength;
        this.targetY = (event.clientY - (box.top + box.height / 2)) * strength;
        this.schedule();
      };

      const onLeave = () => {
        this.targetX = 0;
        this.targetY = 0;
        this.schedule();
      };

      element.addEventListener('pointermove', onMove);
      element.addEventListener('pointerleave', onLeave);
      element.addEventListener('blur', onLeave);

      destroyRef.onDestroy(() => {
        element.removeEventListener('pointermove', onMove);
        element.removeEventListener('pointerleave', onLeave);
        element.removeEventListener('blur', onLeave);
        cancelAnimationFrame(this.frame);
      });
    });
  }

  /** Coalesces a burst of pointer events into at most one write per frame. */
  private schedule(): void {
    if (this.frame) {
      return;
    }

    this.frame = requestAnimationFrame(() => {
      this.frame = 0;

      const style = this.host.nativeElement.style;

      style.setProperty('--mx', `${this.targetX.toFixed(2)}px`);
      style.setProperty('--my', `${this.targetY.toFixed(2)}px`);
    });
  }
}
