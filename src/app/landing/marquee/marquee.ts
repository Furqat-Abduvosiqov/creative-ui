import { Component, input } from '@angular/core';

/**
 * An endless ticker of capability words.
 *
 * The list is rendered twice and the track is translated by exactly half its
 * width, which is what makes the loop seamless — the second run arrives at the
 * position the first one left. Only the first run is exposed to assistive
 * technology; the duplicate exists purely to fill the gap.
 */
@Component({
  selector: 'app-marquee',
  template: `
    <div class="track">
      <ul class="run">
        @for (item of items(); track item) {
          <li>{{ item }}<span class="sep" aria-hidden="true">&#10033;</span></li>
        }
      </ul>
      <ul class="run" aria-hidden="true">
        @for (item of items(); track item) {
          <li>{{ item }}<span class="sep">&#10033;</span></li>
        }
      </ul>
    </div>
  `,
  styleUrl: './marquee.scss',
})
export class Marquee {
  readonly items = input.required<readonly string[]>();
}
