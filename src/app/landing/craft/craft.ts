import { Component } from '@angular/core';

import { Reveal } from '../../shared/reveal';

interface Discipline {
  readonly index: string;
  readonly name: string;
  readonly blurb: string;
}

@Component({
  selector: 'app-craft',
  imports: [Reveal],
  templateUrl: './craft.html',
  styleUrl: './craft.scss',
  host: {
    id: 'craft',
  },
})
export class Craft {
  protected readonly disciplines: readonly Discipline[] = [
    {
      index: '01',
      name: 'Interface design',
      blurb:
        'Screens, states, and the empty ones nobody remembers to draw. Systems built to survive contact with a real backlog.',
    },
    {
      index: '02',
      name: 'Motion systems',
      blurb:
        'Durations, curves and rules written down once, so every transition in a product agrees with every other one.',
    },
    {
      index: '03',
      name: 'Design engineering',
      blurb:
        'We ship the front end ourselves. Production Angular and React — a handoff document is not a deliverable.',
    },
    {
      index: '04',
      name: 'Prototyping',
      blurb:
        'Clickable in days. We would rather test a wrong idea on Thursday than argue about it until March.',
    },
  ];
}
