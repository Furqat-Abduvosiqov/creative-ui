import { Component } from '@angular/core';

import { CountUp } from '../../shared/count-up';
import { Reveal } from '../../shared/reveal';

interface Figure {
  readonly value: number;
  readonly suffix: string;
  readonly caption: string;
}

@Component({
  selector: 'app-stats',
  imports: [CountUp, Reveal],
  template: `
    <ul class="shell figures">
      @for (figure of figures; track figure.caption; let i = $index) {
        <li class="figure" [appReveal]="i * 90">
          <p class="value">
            <!-- The directive owns this element's text; it is the single source
                 for the number, so the count cannot end on the wrong one. -->
            <span [appCountUp]="figure.value"></span><span class="suffix">{{ figure.suffix }}</span>
          </p>
          <p class="caption">{{ figure.caption }}</p>
        </li>
      }
    </ul>
  `,
  styleUrl: './stats.scss',
})
export class Stats {
  protected readonly figures: readonly Figure[] = [
    { value: 3, suffix: '', caption: 'People in the studio' },
    { value: 41, suffix: '', caption: 'Products shipped' },
    { value: 9, suffix: '', caption: 'Countries worked in' },
    { value: 6, suffix: 'yr', caption: 'Doing only this' },
  ];
}
