import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
 catchError, map, mergeMap, switchMap
} from 'rxjs/operators';
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
        map((action: CategoryActions.CreateCategory) => action.payload),
        switchMap((category: Category) => this.http.post<Category>(this.categoryEndPoint, category).pipe(
                mergeMap((cat: Category) => [
                        {
                            type: CategoryActionsEnum.ADD_CATEGORY,
                            payload: cat
                        },
                        {
                            type: AlertActionsEnum.SHOW_ALERT_SUCESS,
                            payload: 'Category saved'
                        }
                    ]),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on save category'));
                })
            ))
    );

    @Effect()
    updateCategory = this.actions.pipe(
        ofType(CategoryActions.CategoryActionsEnum.UPDATE_CATEGORY),
        map((action: CategoryActions.UpdateCategory) => action.payload),
        switchMap((cat: Category) => this.http.post<Category>(this.categoryEndPoint.concat('/update'), cat).pipe(
                mergeMap((catId: Category) => [
                        {
                            type: CategoryActionsEnum.ALTER_CATEGORY,
                            payload: catId
                        },
                        {
                            type: AlertActionsEnum.SHOW_ALERT_SUCESS,
                            payload: 'Category edited'
                        }
                    ]),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on edit category'));
                })
            ))
    );

    @Effect()
    deleteCategory = this.actions.pipe(
        ofType(CategoryActions.CategoryActionsEnum.DELETE_CATEGORY),
        map((action: CategoryActions.DeleteCategory) => action.payload),
        switchMap((id: number) => this.http.delete(this.categoryEndPoint.concat('/').concat(id.toString())).pipe(
                mergeMap(() => [
                        {
                            type: CategoryActionsEnum.REMOVE_CATEGORY,
                            payload: id
                        },
                        {
                            type: AlertActionsEnum.SHOW_ALERT_SUCESS,
                            payload: 'Category deleted'
                        }
                    ]),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on delete category'));
                })
            ))
    );

    @Effect()
    listCategories = this.actions.pipe(
        ofType(CategoryActions.CategoryActionsEnum.LIST_CATEGORIES),
        switchMap((action: CategoryActions.ListCategories) => this.http.get(this.categoryEndPoint, {
                params: new HttpParams().set('page', action.payload.page ? action.payload.page.toString() : Default.START_PAGE.toString())
                    .set('size', action.payload.size ? action.payload.size.toString() : Default.PAGE_SIZE.toString())
            }).pipe(
                map((page: any) => ({
                        type: CategoryActions.CategoryActionsEnum.ADD_CATEGORIES,
                        payload: page
                    })),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on list categories'));
                })
            )),
    );
}
