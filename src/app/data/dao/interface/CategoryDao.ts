import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { CommonDao } from './CommonDao';

export interface CategoryDao extends CommonDao<Category> {
  //поиск категории по названию
  search(title: string): Observable<Category[]>
}