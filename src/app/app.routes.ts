import { Routes } from '@angular/router';

import { Landing } from './landing/landing';

export const routes: Routes = [
  // The landing page is the whole application today, so it is loaded eagerly:
  // a lazy chunk here would only add a round trip before the first paint.
  { path: '', component: Landing },
  { path: '**', redirectTo: '' },
];
