import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, pipe } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Expense } from '../../../shared/model/expense.model';
import { Income } from '../../../shared/model/income.model';
import { ShowAlertError } from '../../../store/alert.actions';
import { DashboardActionsEnum, ListActualExpenses, ListActualIncomes } from './dashboard.actions';

@Injectable()
export class DashboardEffects {
	private dashboardEndpoint = environment.api.concat('dashboard');

	constructor(private actions: Actions, private http: HttpClient) { }

	@Effect()
	ListActualIncomes = this.actions.pipe(
		ofType(DashboardActionsEnum.LIST_ACTUAL_INCOMES),
		map((action: ListActualIncomes) => {
			return action;
		}),
		pipe(
			switchMap(() => {
				return this.http.get<Income[]>(this.dashboardEndpoint.concat('/actualIncome'));
			}),
			map((incomes: Income[]) => {
				return {
					type: DashboardActionsEnum.ADD_ACTUAL_INCOMES,
					payload: incomes
				};
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on list actual incomes'));
			})
		)
	);

	@Effect()
	ListActualExpenses = this.actions.pipe(
		ofType(DashboardActionsEnum.LIST_ACTUAL_EXPENSES),
		map((action: ListActualExpenses) => {
			return action;
		}),
		pipe(
			switchMap(() => {
				return this.http.get<Expense[]>(this.dashboardEndpoint.concat('/actualExpense'));
			}),
			map((expenses: Expense[]) => {
				return {
					type: DashboardActionsEnum.ADD_ACTUAL_EXPENSES,
					payload: expenses
				};
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on list actual expenses'));
			})
		)
	);

}
