import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, pipe } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { Default } from '../../../shared/enum/default.enum';
import { Budget } from '../../../shared/model/budget/budget.model';
import { AlertActionsEnum, ShowAlertError } from '../../../store/alert.actions';
import { BudgetActionsEnum } from './budget.actions';
import * as BudgetActions from './budget.actions';



@Injectable()
export class BudgetEffects {

	private budgetEndPoint = environment.api.concat('budget');

	constructor(private actions: Actions, private http: HttpClient) { }

	@Effect()
	createBudget = this.actions.pipe(
		ofType(BudgetActionsEnum.CREATE_BUDGET),
		map((action: BudgetActions.CreateBudget) => {
			return action.payload;
		}),
		pipe(
			switchMap((budget: Budget) => {
				return this.http.post<Budget>(this.budgetEndPoint.concat('/create'), budget);
			}),
			mergeMap((budget: Budget) => {
				return [
					{
						type: BudgetActionsEnum.ADD_BUDGET,
						payload: budget
					},
					{
						type: AlertActionsEnum.SHOW_ALERT_SUCESS,
						payload: 'Budget saved'
					}
				]
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on save budget'));
			})
		)
	);

	@Effect()
	updateBudget = this.actions.pipe(
		ofType(BudgetActions.BudgetActionsEnum.UPDATE_BUDGET),
		map((action: BudgetActions.UpdateBudget) => {
			return action.payload;
		}),
		pipe(
			switchMap((bud: Budget) => {
				return this.http.post<Budget>(this.budgetEndPoint.concat('/update'), bud);
			}),
			mergeMap((bud: Budget) => {
				return [
					{
						type: BudgetActionsEnum.ALTER_BUDGET,
						payload: bud
					},
					{
						type: AlertActionsEnum.SHOW_ALERT_SUCESS,
						payload: 'Budget edited'
					}
				]
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on edit budget'));
			})
		)
	);

	@Effect()
	deleteBudget = this.actions.pipe(
		ofType(BudgetActions.BudgetActionsEnum.DELETE_BUDGET),
		map((action: BudgetActions.DeleteBudget) => {
			return action.payload;
		}),
		pipe(
			switchMap((id: number) => {
				return this.http.delete(this.budgetEndPoint.concat('/delete/').concat(id.toString()));
			}),
			mergeMap((id: number) => {
				return [
					{
						type: BudgetActionsEnum.REMOVE_BUDGET,
						payload: id
					},
					{
						type: AlertActionsEnum.SHOW_ALERT_SUCESS,
						payload: 'Budget deleted'
					}
				]
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on delete budget'));
			})
		)
	);

	@Effect()
	listBudgets = this.actions.pipe(
		ofType(BudgetActions.BudgetActionsEnum.LIST_BUDGETS),
		switchMap((action: BudgetActions.ListBudgets) => {
			return this.http.get(this.budgetEndPoint.concat('/list'), {
				params: new HttpParams().set('page', action.payload.page ? action.payload.page.toString() : Default.START_PAGE.toString())
					.set('size', action.payload.size ? action.payload.size.toString() : Default.PAGE_SIZE.toString())
			});
		}),
		map((page: any) => {
			return {
				type: BudgetActions.BudgetActionsEnum.ADD_BUDGETS,
				payload: page
			};
		})
	);

}
