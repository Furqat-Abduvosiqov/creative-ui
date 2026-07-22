import { Component } from '@angular/core';

import { Reveal } from '../../shared/reveal';

interface Step {
  readonly index: string;
  readonly name: string;
  readonly detail: string;
}

@Component({
  selector: 'app-process',
  imports: [Reveal],
  templateUrl: './process.html',
  styleUrl: './process.scss',
  host: {
    id: 'process',
  },
})
export class Process {
  // Numbered because it genuinely is a sequence — each step depends on the one
  // above it. Nothing else on this page is numbered for decoration.
  protected readonly steps: readonly Step[] = [
    {
      index: '01',
      name: 'Interrogate',
      detail:
        'A week of questions, most of them awkward. What is this for, who loses if it fails, and what have you already tried that did not work?',
    },
    {
      index: '02',
      name: 'Compose',
      detail:
        'Layout, type and colour, on your real content. We design the crowded state first — the empty one is the easy one.',
    },
    {
      index: '03',
      name: 'Choreograph',
      detail:
        'Every transition gets a duration, a curve and a reason. Those go into tokens, so the rule holds across the product instead of inside one component.',
    },
    {
      index: '04',
      name: 'Hand off',
      detail:
        'You get a running front end, the tokens underneath it, and a written record of the arguments we had along the way.',
    },
  ];
}
