import { Component, Input } from '@angular/core';

import { animateStatistics } from '../animations';

@Component({

  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  animations: [animateStatistics]

})
export class StatisticsComponent {

  // ----------------------- входящие параметры ----------------------------
  @Input()
  totalTasksInCategory: number; // общее кол-во задач в категории

  @Input()
  completeTasksInCategory: number; // кол-во решенных задач в категории

  @Input()
  uncompleteTasksInCategory: number; // кол-во нерешенных задач в категории

  @Input() showStat: boolean
  // -------------------------------------------------------------------------

}
