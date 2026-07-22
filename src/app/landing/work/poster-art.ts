import { Component, input } from '@angular/core';

/**
 * Poster artwork drawn rather than photographed.
 *
 * Every piece is built from two plates — one per ink — grouped so the parent
 * card can pull them apart on hover and print the misregistration for real.
 * Nothing here loads over the network, which is the point: four covers for
 * zero bytes of image payload.
 */
@Component({
  selector: 'app-poster-art',
  templateUrl: './poster-art.html',
  styleUrl: './poster-art.scss',
  host: {
    'aria-hidden': 'true',
  },
})
export class PosterArt {
  /** Which of the four compositions to draw. */
  readonly variant = input.required<1 | 2 | 3 | 4>();

  /** Bar heights for the waveform composition, as a fraction of the canvas. */
  protected readonly bars = [0.32, 0.68, 0.45, 0.92, 0.58, 0.78, 0.36, 0.62];
}
