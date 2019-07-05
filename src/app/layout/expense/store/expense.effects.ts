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
import { RestURLBuilder } from 'rest-url-builder';



@Injectable()
export class ExpenseEffects {

	private expenseEndPoint = environment.api.concat('expense');
	private urlBuilder = new RestURLBuilder();

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
			const builder = this.urlBuilder.buildRestURL(this.expenseEndPoint.concat('?category=:category&start=:start&end=:end'));
			builder.setQueryParameter('category', '1');
			builder.setQueryParameter('start', '20190101');
			builder.setQueryParameter('end', '20190526');
			return this.http.get(builder.get(), {
				params: new HttpParams().set('page', action.payload.page ? action.payload.page.toString() : Default.START_PAGE.toString())
					.set('size', action.payload.size ? action.payload.size.toString() : Default.PAGE_SIZE.toString())
			}).pipe(
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
