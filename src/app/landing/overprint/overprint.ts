import { afterNextRender, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';

/** How much of the gap to the pointer each disc closes per frame. */
const LAG_PINK = 0.072;
const LAG_BLUE = 0.132;

/**
 * The brand mechanic, made live.
 *
 * Two discs of ink follow the pointer at different rates and blend with the
 * page. At rest they sit on top of one another; moving quickly pulls them apart
 * and the overlap prints a third colour that is never declared anywhere in the
 * palette. That is exactly what happens on a two-drum risograph, which is the
 * whole idea.
 *
 * The layer sits *behind* the content rather than over it. Painting ink across
 * live text is closer to the real process, but it moves body-copy contrast
 * around as the pointer travels, and no visual gag is worth an unreadable
 * paragraph.
 */
@Component({
  selector: 'app-overprint',
  template: `
    <div #pink class="ink ink--pink"></div>
    <div #blue class="ink ink--blue"></div>
  `,
  styleUrl: './overprint.scss',
  host: {
    'aria-hidden': 'true',
  },
})
export class Overprint {
  private readonly pink = viewChild.required<ElementRef<HTMLElement>>('pink');
  private readonly blue = viewChild.required<ElementRef<HTMLElement>>('blue');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const pink = this.pink().nativeElement;
      const blue = this.blue().nativeElement;

      let targetX = window.innerWidth / 2;
      let targetY = window.innerHeight * 0.42;

      const a = { x: targetX, y: targetY };
      const b = { x: targetX, y: targetY };
      let frame = 0;

      const write = () => {
        pink.style.setProperty('--x', `${a.x.toFixed(1)}px`);
        pink.style.setProperty('--y', `${a.y.toFixed(1)}px`);
        blue.style.setProperty('--x', `${b.x.toFixed(1)}px`);
        blue.style.setProperty('--y', `${b.y.toFixed(1)}px`);
      };

      write();

      // Held still, the two inks stack into a single mark. That is a legitimate
      // composition, so reduced motion gets the still print rather than nothing.
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const settle = () => {
        a.x += (targetX - a.x) * LAG_PINK;
        a.y += (targetY - a.y) * LAG_PINK;
        b.x += (targetX - b.x) * LAG_BLUE;
        b.y += (targetY - b.y) * LAG_BLUE;
        write();
      };

      // Touch devices have no pointer to follow, and dropping the effect there
      // would cost the identity on most of the traffic. They get a slow drift
      // instead — same mechanic, driven by time rather than by a cursor.
      if (matchMedia('(pointer: coarse)').matches) {
        const drift = (now: number) => {
          const t = now / 1000;

          targetX = window.innerWidth * (0.5 + 0.24 * Math.sin(t * 0.29));
          targetY = window.innerHeight * (0.44 + 0.18 * Math.cos(t * 0.21));
          settle();
          frame = requestAnimationFrame(drift);
        };

        frame = requestAnimationFrame(drift);
        destroyRef.onDestroy(() => cancelAnimationFrame(frame));

        return;
      }

      // Chasing stops once the discs have caught up, so an idle page costs
      // nothing rather than burning a frame forever.
      const chase = () => {
        settle();

        if (Math.hypot(targetX - a.x, targetY - a.y) < 0.5) {
          frame = 0;

          return;
        }

        frame = requestAnimationFrame(chase);
      };

      const onMove = (event: PointerEvent) => {
        targetX = event.clientX;
        targetY = event.clientY;
        frame ||= requestAnimationFrame(chase);
      };

      window.addEventListener('pointermove', onMove, { passive: true });

      destroyRef.onDestroy(() => {
        window.removeEventListener('pointermove', onMove);
        cancelAnimationFrame(frame);
      });
    });
  }
}
