import { Component } from '@angular/core';

import { Reveal } from '../../shared/reveal';
import { PosterArt } from './poster-art';

interface Case {
  readonly name: string;
  readonly summary: string;
  readonly role: string;
  readonly year: string;
  readonly variant: 1 | 2 | 3 | 4;
}

@Component({
  selector: 'app-work',
  imports: [Reveal, PosterArt],
  templateUrl: './work.html',
  styleUrl: './work.scss',
  host: {
    id: 'work',
    class: 'band',
  },
})
export class Work {
  protected readonly cases: readonly Case[] = [
    {
      name: 'Tessellate',
      summary: 'A scheduling canvas for film crews, where a day can be dragged into shape.',
      role: 'Interface · Motion system',
      year: '2025',
      variant: 1,
    },
    {
      name: 'Overtone',
      summary: 'A browser audio workstation that stays responsive at sixteen live tracks.',
      role: 'Design engineering',
      year: '2025',
      variant: 2,
    },
    {
      name: 'Pallas',
      summary: 'Satellite imagery review for analysts who compare eight frames at once.',
      role: 'Interface design',
      year: '2024',
      variant: 3,
    },
    {
      name: 'Foundry Rail',
      summary: 'A freight control room rebuilt around what the dispatcher actually watches.',
      role: 'Prototype · Build',
      year: '2024',
      variant: 4,
    },
  ];
}
