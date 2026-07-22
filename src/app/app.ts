import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Overprint } from './landing/overprint/overprint';
import { SiteFooter } from './landing/site-footer/site-footer';
import { SiteHeader } from './landing/site-header/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Overprint, SiteHeader, SiteFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
