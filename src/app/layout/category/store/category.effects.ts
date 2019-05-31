import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, pipe } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Default } from '../../../shared/enum/default.enum';
import { Category } from '../../../shared/model/category.model';
import { AlertActionsEnum, ShowAlertError } from '../../../store/alert.actions';
import * as CategoryActions from './category.actions';
import { CategoryActionsEnum } from './category.actions';



@Injectable()
export class CategoryEffects {

	private categoryEndPoint = environment.api.concat('category');

	constructor(private actions: Actions, private http: HttpClient) { }

	@Effect()
	createCategory = this.actions.pipe(
		ofType(CategoryActionsEnum.CREATE_CATEGORY),
		map((action: CategoryActions.CreateCategory) => {
			return action.payload;
		}),
		pipe(
			switchMap((category: Category) => {
				return this.http.post<Category>(this.categoryEndPoint.concat('/create'), category);
			}),
			mergeMap((category: Category) => {
				return [
					{
						type: CategoryActionsEnum.ADD_CATEGORY,
						payload: category
					},
					{
						type: AlertActionsEnum.SHOW_ALERT_SUCESS,
						payload: 'Category saved'
					}
				];
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
			switchMap((cat: Category) => {
				return this.http.post<Category>(this.categoryEndPoint.concat('/update'), cat);
			}),
			mergeMap((cat: Category) => {
				return [
					{
						type: CategoryActionsEnum.ALTER_CATEGORY,
						payload: cat
					},
					{
						type: AlertActionsEnum.SHOW_ALERT_SUCESS,
						payload: 'Category edited'
					}
				];
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
			mergeMap((id: number) => {
				return [
					{
						type: CategoryActionsEnum.REMOVE_CATEGORY,
						payload: id
					},
					{
						type: AlertActionsEnum.SHOW_ALERT_SUCESS,
						payload: 'Category deleted'
					}
				];
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on delete category'));
			})
		)
	);

	@Effect()
	listCategories = this.actions.pipe(
		ofType(CategoryActions.CategoryActionsEnum.LIST_CATEGORIES),
		switchMap((action: CategoryActions.ListCategories) => {
			return this.http.get(this.categoryEndPoint.concat('/list'), {
				params: new HttpParams().set('page', action.payload.page ? action.payload.page.toString() : Default.START_PAGE.toString())
					.set('size', action.payload.size ? action.payload.size.toString() : Default.PAGE_SIZE.toString())
			});
		}),
		map((page: any) => {
			return {
				type: CategoryActions.CategoryActionsEnum.ADD_CATEGORIES,
				payload: page
			};
		})
	);
}
