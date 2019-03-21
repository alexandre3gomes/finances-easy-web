import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, pipe } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Default } from '../../../shared/enum/default.enum';
import { Expense } from '../../../shared/model/expense.model';
import { AlertActionsEnum, ShowAlertError } from '../../../store/alert.actions';
import * as ExpenseActions from './expense.actions';



@Injectable()
export class ExpenseEffects {

	private expenseEndPoint = environment.api.concat('expense');

	constructor(private actions: Actions, private http: HttpClient) { }

	@Effect()
	createExpense = this.actions.pipe(
		ofType(ExpenseActions.ExpenseActionsEnum.CREATE_EXPENSE),
		map((action: ExpenseActions.CreateExpense) => {
			return action.payload;
		}),
		pipe(
			switchMap((expense: Expense) => {
				return this.http.post<Expense>(this.expenseEndPoint.concat('/create'), expense);
			}),
			map(() => {
				return {
					type: AlertActionsEnum.SHOW_ALERT_SUCESS,
					payload: 'Expense saved'
				};
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on save expense'));
			})
		)
	);

	@Effect()
	updateExpense = this.actions.pipe(
		ofType(ExpenseActions.ExpenseActionsEnum.UPDATE_EXPENSE),
		map((action: ExpenseActions.UpdateExpense) => {
			return action.payload;
		}),
		pipe(
			switchMap((inc: Expense) => {
				return this.http.post<Expense>(this.expenseEndPoint.concat('/update'), inc);
			}),
			map(() => {
				return {
					type: AlertActionsEnum.SHOW_ALERT_SUCESS,
					payload: 'Expense edited'
				};
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on edit expense'));
			})
		)
	);

	@Effect()
	deleteExpense = this.actions.pipe(
		ofType(ExpenseActions.ExpenseActionsEnum.DELETE_EXPENSE),
		map((action: ExpenseActions.DeleteExpense) => {
			return action.payload;
		}),
		pipe(
			switchMap((id: number) => {
				return this.http.delete(this.expenseEndPoint.concat('/delete/').concat(id.toString()));
			}),
			map(() => {
				return {
					type: AlertActionsEnum.SHOW_ALERT_SUCESS,
					payload: 'Expense deleted'
				};
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on delete expense'));
			})
		)
	);

	@Effect()
	listExpenses = this.actions.pipe(
		ofType(ExpenseActions.ExpenseActionsEnum.LIST_EXPENSES),
		switchMap((action: ExpenseActions.ListExpenses) => {
			return this.http.get(this.expenseEndPoint.concat('/list/'), {
				params: new HttpParams().set('page', action.payload.page ? action.payload.page.toString() : Default.START_PAGE.toString())
					.set('size', action.payload.size ? action.payload.size.toString() : Default.PAGE_SIZE.toString())
			});
		}),
		map((page: any) => {
			return {
				type: ExpenseActions.ExpenseActionsEnum.ADD_EXPENSES,
				payload: page
			};
		})
	);
}
