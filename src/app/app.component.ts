import { Component, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DataHandlerService } from 'src/app/services/data-handler.service';

import { Category } from './model/Category';
import { Task } from './model/Task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Organizer'
  tasks: Task[]
  categories: Category[]
  selectedCategory: Category
  
  @Output() opened:boolean

  @Input() matSidenav: MatSidenav
  @Input() showStat: boolean = true

  // статистика
  totalTasksCountInCategory: number
  completedCountInCategory: number
  uncompletedCountInCategory: number
  uncompletedTotalTasksCount: number

  // поиск
  private searchTaskText = ''; // текущее значение для поиска задач

  constructor(
    private dataHandler: DataHandlerService,
    private deviceService: DeviceDetectorService, // для определения типа устройства( мобильная?... )
  ) {
    this.showStat = true ? !this.isMobile : false
    this.opened = true ? !this.isMobile : false
  }

  get isMobile(): boolean {
    return this.deviceService.isMobile();
  }

  get isTablet(): boolean {
    return this.deviceService.isTablet();
  }

  get isDesktop(): boolean {
    return this.deviceService.isDesktop();
  }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks)
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)
    this.onSelectCategory(null)
  }

  // изменение категории
  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTasksAndStat();
  }

  // удаление категории
  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null //открываем категорию "Все"
      this.onSelectCategory(this.selectedCategory)
    })
  }

  // обновление категории
  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory)
    })
  }

  onAddCategory(title: string) {
    this.dataHandler.addCategory(title).subscribe(() => this.updateCategories())
  }

  updateCategories(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)
  }

  // обновление задачи
  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(cat => {
      this.updateTasksAndStat();
    });
  }

  private updateTasks() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      null,
      null
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  onAddTask(task: Task) {
    this.dataHandler.addTask(task).subscribe(() => this.updateTasksAndStat())
  }

  // удаление задачи
  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(cat => {
      this.updateTasksAndStat();
    });
  }

  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  private updateTasksAndStat() {
    this.updateTasks(); // обновить список задач

    // обновить переменные для статистики
    this.updateStat();
  }

  // обновить статистику
  private updateStat() {
    this.dataHandler.getTotalCountInCategory(this.selectedCategory)
      .subscribe(total => { this.totalTasksCountInCategory = total }
      ),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory)
        .subscribe(totalCompleted => { this.completedCountInCategory = totalCompleted }
        ),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory)
        .subscribe(totalUnCompleted => { this.uncompletedCountInCategory = totalUnCompleted }),
      this.dataHandler.getUncompletedTotalCount()
        .subscribe(totalUn => {
          this.uncompletedTotalTasksCount = totalUn
        })
  }

  toggleStat(showStat: boolean) {
    this.showStat = showStat
  }

   toggleMenu() {
     this.opened = !this.opened;
  }

}
