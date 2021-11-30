import { OperType } from './../OperType';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType],
    private dialog: MatDialog) { }

  dialogTitle: string
  categoryTitle: string
  private operType: OperType;

  ngOnInit(): void {

    //получаем переданные в диалоговое окно данные
    this.categoryTitle = this.data[0]
    this.dialogTitle = this.data[1]
    this.operType = this.data[2]
  }

  //нажали ok
  onConfirm() {
    this.dialogRef.close(this.categoryTitle)
  }

  //нажали отмену(ничего не сохраняем и закрываем окно)
  onCancel() {
    this.dialogRef.close(false)
  }

  //удалить
  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${this.categoryTitle}"?(сами задачи не удаляются)`
      },
      autoFocus: false
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete') //нажали удалить
      }
    })

  }

  canDelete(): boolean {
    return this.operType === OperType.EDIT
  }

}
