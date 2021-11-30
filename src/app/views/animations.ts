import { animate, style, transition, trigger } from "@angular/animations";

export const animateStatistics = trigger('animateStatistics', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(1000, style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate(800, style({ opacity: 0 }))
  ])
])