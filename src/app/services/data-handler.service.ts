//import { Category } from 'src/app/model/Category';
import { Task } from './../model/task';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryDaoArray } from '../data/dao/impl/CategoryDaoArray';
import { PriorityDaoArray } from '../data/dao/impl/PriorityDaoArray';
import { Category } from '../model/Category';
import { TaskDaoArray } from './../data/dao/impl/TaskDaoArray';
import { Priority } from './../model/Priority';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
 
  deleteCategory(id: number): Observable<Category> {
    return this.categoryDaoArray.delete(id)
  }
  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.update(category)
  }

  constructor() { }

  private taskDaoArray = new TaskDaoArray()
  private categoryDaoArray = new CategoryDaoArray()
  private priorityDaoArray = new PriorityDaoArray()

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll()
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll()
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDaoArray.getAll()
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task)
  }

  // поиск задач по параметрам
  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority)
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskDaoArray.delete(id)
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDaoArray.add(task)
  }

  addCategory(title:string): Observable<Category> {
    return this.categoryDaoArray.add(new Category(null, title))
  }

  // статистика
  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getCompletedCountInCategory(category);
  }

  getUncompletedTotalCount(): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(null);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(category);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getTotalCountInCategory(category);
  }


  // приоритеты
  addPriority(priority: Priority): Observable<Priority> {
    return this.priorityDaoArray.add(priority);
  }

  deletePriority(id: number): Observable<Priority> {
    return this.priorityDaoArray.delete(id);
  }

  updatePriority(priority: Priority): Observable<Priority> {
    return this.priorityDaoArray.update(priority);
  }

}
