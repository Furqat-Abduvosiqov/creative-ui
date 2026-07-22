import { Component } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  template: `
    <div class="shell inner">
      <a class="wordmark" href="#top">
        creative<span class="wordmark-rule" aria-hidden="true"></span>ui
      </a>

      <nav class="links" aria-label="Footer">
        <ul>
          @for (link of links; track link.href) {
            <li><a [href]="link.href">{{ link.label }}</a></li>
          }
        </ul>
      </nav>

      <!-- A colophon, because the studio claims to care about type and it would
           be strange not to say what the page is set in. -->
      <p class="colophon">
        Set in Bricolage Grotesque, Public Sans and DM&nbsp;Mono. Printed in two inks.
      </p>
    </div>
  `,
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  protected readonly links = [
    { href: '#work', label: 'Work' },
    { href: '#craft', label: 'Craft' },
    { href: '#process', label: 'Process' },
    { href: '#contact', label: 'Contact' },
  ];
}
