import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesComponent } from './views/categories/categories.component';
import { TasksComponent } from './views/tasks/tasks.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditTaskDialogComponent } from './dialog/edit-task-dialog/edit-task-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider'

import { MatSelectModule } from '@angular/material/select';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { TaskDatePipe } from './task-date.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { EditCategoryDialogComponent } from './dialog/edit-category-dialog/edit-category-dialog.component';
import { StatisticsComponent } from './views/statistics/statistics.component';
import { StatisticsCardComponent } from './views/statistics/statistics-card/statistics-card.component';
import { HeaderComponent } from './views/header/header.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { SettingsDialogComponent } from './dialog/settings-dialog/settings-dialog.component';
import { PrioritiesComponent } from './views/priorities/priorities.component';
import { EditPriorityDialogComponent } from './dialog/edit-priority-dialog/edit-priority-dialog.component';
registerLocaleData(localeRu)

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    TaskDatePipe,
    EditCategoryDialogComponent,
    StatisticsComponent,
    StatisticsCardComponent,
    HeaderComponent,
    SettingsDialogComponent,
    PrioritiesComponent,
    EditPriorityDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ColorPickerModule
  ],
  providers: [],
  entryComponents: [
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    EditCategoryDialogComponent,
    EditPriorityDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
