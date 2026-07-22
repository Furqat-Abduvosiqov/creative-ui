import { Component } from '@angular/core';

import { Contact } from './contact/contact';
import { Craft } from './craft/craft';
import { Hero } from './hero/hero';
import { Marquee } from './marquee/marquee';
import { Process } from './process/process';
import { Stats } from './stats/stats';
import { Work } from './work/work';

@Component({
  selector: 'app-landing',
  imports: [Hero, Marquee, Craft, Work, Stats, Process, Contact],
  templateUrl: './landing.html',
})
export class Landing {
  protected readonly capabilities = [
    'Interface design',
    'Motion systems',
    'Design engineering',
    'Prototyping',
    'Design tokens',
    'Accessibility',
  ];
}
