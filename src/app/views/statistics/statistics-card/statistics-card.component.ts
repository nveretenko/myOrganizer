import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.css']
})
export class StatisticsCardComponent {

  @Input()
  completed = false;

  @Input()
  iconName: string;

  @Input()
  count1: any; // можно передавать любой тип для отображения (число, текст и пр.)

  @Input()
  countTotal: any 

  @Input()
  title: string;

  constructor() { }

}
