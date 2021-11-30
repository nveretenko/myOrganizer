import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';

import { EditCategoryDialogComponent } from './../../dialog/edit-category-dialog/edit-category-dialog.component';
import { OperType } from './../../dialog/OperType';
import { Category } from './../../model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  @Input() selectedCategory: Category;
  @Input() categories: Category[];

  @Output() selectCategory = new EventEmitter<Category>();
  @Output() updateCategory = new EventEmitter<Category>();
  @Output() deleteCategory = new EventEmitter<Category>();
  @Output() addCategory = new EventEmitter<string>()

  indexMouseMove: number;
  showEditIconCategory: boolean;
  isMobile: boolean
  isTablet:boolean

  constructor(
    private dialog: MatDialog, // работа с диалоговым окном
    private deviceService:DeviceDetectorService
  ) {
    this.isMobile = deviceService.isMobile()
    this.isTablet = deviceService.isTablet()
   }

  showTasksByCategory(category: Category) {

    if (this.selectedCategory === category) {
      return
    }
    this.selectedCategory = category
    this.selectCategory.emit(this.selectedCategory)
  }

  showEditIcon(index: number) {
    this.indexMouseMove = index;
  }

  openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Редактирование категории', OperType.EDIT],
      width: '400px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCategory.emit(category)
        return
      }

      if (typeof (result) === 'string') {
        category.title = result as string

        this.updateCategory.emit(category)
        return
      }
    })

  }

  openAddDialog() {

    const dialogRef = this.dialog.open(EditCategoryDialogComponent, { data: ['', 'Добавление категории', OperType.ADD], width: '400px' })

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ОК и есть результат
        this.addCategory.emit(result as string);
      }
    });

  }

}
