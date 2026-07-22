import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose the page landmarks', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('main')).toBeTruthy();
    expect(host.querySelector('app-site-header')).toBeTruthy();
    expect(host.querySelector('app-site-footer')).toBeTruthy();
  });

  it('should point the skip link at the main landmark', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    const skip = host.querySelector<HTMLAnchorElement>('.skip-link');

    // A skip link aimed at a missing id is worse than none — it silently
    // strands the first keyboard user who presses Tab.
    expect(skip).toBeTruthy();
    expect(skip?.getAttribute('href')).toBe('#main');
    expect(host.querySelector('#main')).toBeTruthy();
  });
});
