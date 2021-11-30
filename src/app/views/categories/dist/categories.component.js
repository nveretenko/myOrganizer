"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var CategoriesComponent = /** @class */ (function () {
    function CategoriesComponent(dataHandler) {
        this.dataHandler = dataHandler;
    }
    CategoriesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataHandler.categoriesSubject.subscribe(function (categories) { return _this.categories = categories; });
    };
    CategoriesComponent.prototype.showTasksByCategory = function (category) {
        this.selectedCategory = category;
        this.dataHandler.fillTasksByCategory(category);
    };
    CategoriesComponent = __decorate([
        core_1.Component({
            selector: 'app-categories',
            templateUrl: './categories.component.html',
            styleUrls: ['./categories.component.css']
        })
    ], CategoriesComponent);
    return CategoriesComponent;
}());
exports.CategoriesComponent = CategoriesComponent;

//# sourceMappingURL=categories.component.js.map
