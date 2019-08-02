import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Default } from '../../../shared/enum/default.enum';
import { Expense } from '../../../shared/model/expense.model';
import { AlertActionsEnum, ShowAlertError } from '../../../store/alert.actions';
import * as ExpenseActions from './expense.actions';
import { ExpenseActionsEnum } from './expense.actions';

@Injectable()
export class ExpenseEffects {

	private expenseEndPoint = environment.api.concat('expense');

	constructor(private actions: Actions, private http: HttpClient) { }

	@Effect()
	createExpense = this.actions.pipe(
		ofType(ExpenseActionsEnum.CREATE_EXPENSE),
		map((action: ExpenseActions.CreateExpense) => {
			return action.payload;
		}),
		switchMap((expense: Expense) => {
			return this.http.post<Expense>(this.expenseEndPoint, expense).pipe(
				mergeMap((exp: Expense) => {
					return [
						{
							type: ExpenseActionsEnum.ADD_EXPENSE,
							payload: exp
						},
						{
							type: AlertActionsEnum.SHOW_ALERT_SUCESS,
							payload: 'Expense saved'
						}
					];
				}),
				catchError((err) => {
					console.error(err);
					return of(new ShowAlertError('Error on save expense'));
				})
			);
		})
	);

	@Effect()
	updateExpense = this.actions.pipe(
		ofType(ExpenseActions.ExpenseActionsEnum.UPDATE_EXPENSE),
		map((action: ExpenseActions.UpdateExpense) => {
			return action.payload;
		}),
		switchMap((expense: Expense) => {
			return this.http.post<Expense>(this.expenseEndPoint.concat('/update'), expense).pipe(
				mergeMap((exp: Expense) => {
					return [
						{
							type: ExpenseActionsEnum.ALTER_EXPENSE,
							payload: exp
						},
						{
							type: AlertActionsEnum.SHOW_ALERT_SUCESS,
							payload: 'Expense edited'
						}
					];
				}),
				catchError((err) => {
					console.error(err);
					return of(new ShowAlertError('Error on edit expense'));
				})
			);

		})
	);

	@Effect()
	deleteExpense = this.actions.pipe(
		ofType(ExpenseActions.ExpenseActionsEnum.DELETE_EXPENSE),
		map((action: ExpenseActions.DeleteExpense) => {
			return action.payload;
		}),
		switchMap((id: number) => {
			return this.http.delete(this.expenseEndPoint.concat('/').concat(id.toString())).pipe(
				mergeMap(() => {
					return [
						{
							type: ExpenseActionsEnum.REMOVE_EXPENSE,
							payload: id
						},
						{
							type: AlertActionsEnum.SHOW_ALERT_SUCESS,
							payload: 'Expense deleted'
						}
					];
				}),
				catchError((err) => {
					console.error(err);
					return of(new ShowAlertError('Error on delete expense'));
				})
			);
		})
	);

	@Effect()
	listExpenses = this.actions.pipe(
		ofType(ExpenseActions.ExpenseActionsEnum.LIST_EXPENSES),
		switchMap((action: ExpenseActions.ListExpenses) => {
			let params = new HttpParams().set('page', action.payload.page ? action.payload.page.toString() : Default.START_PAGE.toString())
				.set('size', action.payload.size ? action.payload.size.toString() : Default.PAGE_SIZE.toString());
			if (action.payload.filter) {
				if (action.payload.filter.name) {
					params = params.set('name', action.payload.filter.name);
				}
				if (action.payload.filter.category) {
					params = params.set('category', action.payload.filter.category.id.toString());
				}
				if (action.payload.filter.startDate) {
					params = params.set('start', action.payload.filter.startDate.toISOString());
				}
				if (action.payload.filter.endDate) {
					params = params.set('end', action.payload.filter.endDate.toISOString());
				}
			}
			return this.http.get(this.expenseEndPoint, { params }).pipe(
				map((page: any) => {
					return {
						type: ExpenseActions.ExpenseActionsEnum.ADD_EXPENSES,
						payload: page
					};
				}),
				catchError((err) => {
					console.error(err);
					return of(new ShowAlertError('Error on list expenses'));
				})
			);
		}),
	);
}
