import { Priority } from './../../model/Priority';
import { Category } from './../../model/Category';
import { DataHandlerService } from 'src/app/services/data-handler.service';
import { Task } from 'src/app/model/Task';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OperType } from '../OperType';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  dialogTitle: string
  task: Task
  categories: Category[]
  priorities: Priority[]

  tmpTitle: string
  tmpDate: Date
  tmpCategory: Category
  tmpPriority: Priority
  operType: OperType;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, OperType],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2]

    // инициализация начальных значений (записывам в отдельные переменные
    // чтобы можно было отменить изменения, а то будут сразу записываться в задачу)
    this.tmpTitle = this.task.title;
    this.tmpPriority = this.task.priority;
    this.tmpCategory = this.task.category;
    this.tmpDate = this.task.date;

    this.dataHandler.getAllCategories().subscribe(items => this.categories = items)
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items)
  }

  onConfirm(): void {
    // считываем все значения для сохранения в поля задачи
    this.task.title = this.tmpTitle;
    this.task.priority = this.tmpPriority;
    this.task.category = this.tmpCategory;
    this.task.date = this.tmpDate;

    // передаем добавленную/измененную задачу в обработчик
    // что с ним будут делать - уже на задача этого компонента
    this.dialogRef.close(this.task);
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  onCancel(): void {
    this.dialogRef.close(null)
  }

  // нажали Выполнить (завершить) задачу
  complete() {
    this.dialogRef.close('complete')
  };

  activate() {
    this.dialogRef.close('activate')
  };

  canDelete(): boolean {
    return this.operType === OperType.EDIT
  }

  canActivateDesactivate(): boolean {
    return this.operType === OperType.EDIT
  }

  // нажали Удалить
  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete')
      }
    })
  }

}


