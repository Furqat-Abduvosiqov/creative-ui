import { Component } from '@angular/core';

import { Magnetic } from '../../shared/magnetic';
import { Reveal } from '../../shared/reveal';

@Component({
  selector: 'app-contact',
  imports: [Magnetic, Reveal],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  host: {
    id: 'contact',
  },
})
export class Contact {}
