import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, pipe } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Category } from '../../../shared/model/category.model';
import { AlertActionsEnum, ShowAlertError } from '../../../store/alert.actions';
import * as CategoryActions from './category.actions';


@Injectable()
export class CategoryEffects {

	private categoryEndPoint = environment.api.concat('category');

	constructor(private actions: Actions, private http: HttpClient) { }

	@Effect()
	createCategory = this.actions.pipe(
		ofType(CategoryActions.CategoryActionsEnum.CREATE_CATEGORY),
		map((action: CategoryActions.CreateCategory) => {
			return action.payload;
		}),
		pipe(
			switchMap((category: Category) => {
				return this.http.post<Category>(this.categoryEndPoint.concat('/create'), category);
			}),
			map(() => {
				return {
					type: AlertActionsEnum.SHOW_ALERT_SUCESS,
					payload: 'Category saved'
				};
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on save category'));
			})
		)
	);

	@Effect()
	updateCategory = this.actions.pipe(
		ofType(CategoryActions.CategoryActionsEnum.UPDATE_CATEGORY),
		map((action: CategoryActions.UpdateCategory) => {
			return action.payload;
		}),
		pipe(
			switchMap((inc: Category) => {
				return this.http.post<Category>(this.categoryEndPoint.concat('/update'), inc);
			}),
			map(() => {
				return {
					type: AlertActionsEnum.SHOW_ALERT_SUCESS,
					payload: 'Category edited'
				};
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on edit category'));
			})
		)
	);

	@Effect()
	deleteCategory = this.actions.pipe(
		ofType(CategoryActions.CategoryActionsEnum.DELETE_CATEGORY),
		map((action: CategoryActions.DeleteCategory) => {
			return action.payload;
		}),
		pipe(
			switchMap((id: number) => {
				return this.http.delete(this.categoryEndPoint.concat('/delete/').concat(id.toString()));
			}),
			map(() => {
				return {
					type: AlertActionsEnum.SHOW_ALERT_SUCESS,
					payload: 'Category deleted'
				};
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on delete category'));
			})
		)
	);

	@Effect()
	listCategorys = this.actions.pipe(
		ofType(CategoryActions.CategoryActionsEnum.LIST_CATEGORIES),
		switchMap(() => {
			return this.http.get(this.categoryEndPoint.concat('/list'));
		}),
		map((categorys: Category[]) => {
			return {
				type: CategoryActions.CategoryActionsEnum.SET_CATEGORIES,
				payload: categorys
			};
		})
	);

}
