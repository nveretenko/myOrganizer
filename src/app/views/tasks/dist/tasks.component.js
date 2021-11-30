"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var TasksComponent = /** @class */ (function () {
    function TasksComponent(dataHandler) {
        this.dataHandler = dataHandler;
        // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
        this.displayedColumns = ['color', 'id', 'title', 'date', 'priority', 'category'];
    }
    TasksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataHandler.tasksSubject.subscribe(function (tasks) { return _this.tasks = tasks; });
        // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
        this.dataSource = new table_1.MatTableDataSource();
        this.refreshTable();
    };
    // в этом методе уже все проинциализировано, поэтому можно присваивать объекты (иначе может быть ошибка undefined)
    TasksComponent.prototype.ngAfterViewInit = function () {
        this.addTableObjects();
    };
    TasksComponent.prototype.toggleTaskCompleted = function (task) {
        task.completed = !task.completed;
    };
    // в зависимости от статуса задачи - вернуть цвет названия
    TasksComponent.prototype.getPriorityColor = function (task) {
        // цвет завершенной задачи
        if (task.completed) {
            return '#F8F9FA'; // TODO вынести цвета в константы (magic strings, magic numbers)
        }
        if (task.priority && task.priority.color) {
            return task.priority.color;
        }
        return '#fff'; // TODO вынести цвета в константы (magic strings, magic numbers)
    };
    // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
    TasksComponent.prototype.refreshTable = function () {
        this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)
        this.addTableObjects();
        // когда получаем новые данные..
        // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
        // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
        this.dataSource.sortingDataAccessor = function (task, colName) {
            // по каким полям выполнять сортировку для каждого столбца
            switch (colName) {
                case 'priority': {
                    return task.priority ? task.priority.id : null;
                }
                case 'category': {
                    return task.category ? task.category.title : null;
                }
                case 'date': {
                    return task.date ? task.date : null;
                }
                case 'title': {
                    return task.title;
                }
            }
        };
    };
    TasksComponent.prototype.addTableObjects = function () {
        this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
        this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: false })
    ], TasksComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort, { static: false })
    ], TasksComponent.prototype, "sort");
    TasksComponent = __decorate([
        core_1.Component({
            selector: 'app-tasks',
            templateUrl: './tasks.component.html',
            styleUrls: ['./tasks.component.css']
        })
    ], TasksComponent);
    return TasksComponent;
}());
exports.TasksComponent = TasksComponent;

//# sourceMappingURL=tasks.component.js.map
