import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, pipe } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { Expense } from '../../../shared/model/expense.model';
import { Income } from '../../../shared/model/income.model';
import { CategoryAggregValues } from '../../../shared/model/report/category-aggreg-values.model';
import { ShowAlertError } from '../../../store/alert.actions';
import { DashboardActionsEnum, FetchData, ListActualCategories, ListActualExpenses } from './dashboard.actions';

@Injectable()
export class DashboardEffects {
	private dashboardEndpoint = environment.api.concat('dashboard');

	constructor(private actions: Actions, private http: HttpClient) { }

	@Effect()
	FetchData = this.actions.pipe(
		ofType(DashboardActionsEnum.FETCH_DATA),
		map((action: FetchData) => {
			return action;
		}),
		pipe(
			switchMap(() => {
				return this.http.get<Income[]>(this.dashboardEndpoint.concat('/actualIncome'));
			}),
			mergeMap((incomes: Income[]) => {
				return [
					{
						type: DashboardActionsEnum.ADD_ACTUAL_INCOMES,
						payload: incomes
					},
					{
						type: DashboardActionsEnum.LIST_ACTUAL_EXPENSES
					}
				];
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
			mergeMap((expenses: Expense[]) => {
				return [
					{
						type: DashboardActionsEnum.ADD_ACTUAL_EXPENSES,
						payload: expenses
					},
					{
						type: DashboardActionsEnum.LIST_ACTUAL_CATEGORIES
					}
				];
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on list actual expenses'));
			})
		)
	);

	@Effect()
	ListActualCategories = this.actions.pipe(
		ofType(DashboardActionsEnum.LIST_ACTUAL_CATEGORIES),
		map((action: ListActualCategories) => {
			return action;
		}),
		pipe(
			switchMap(() => {
				return this.http.get<CategoryAggregValues[]>(this.dashboardEndpoint.concat('/actualBalance'));
			}),
			mergeMap((expenses: CategoryAggregValues[]) => {
				return [
					{
						type: DashboardActionsEnum.ADD_ACTUAL_CATEGORIES,
						payload: expenses
					},
					{
						type: DashboardActionsEnum.DATA_FETCHED
					}
				];
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on list actual categories'));
			})
		)
	);
}
