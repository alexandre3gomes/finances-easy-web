import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, pipe } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { Income } from '../../../shared/model/income.model';
import { AlertActionsEnum, ShowAlertError } from '../../../store/alert.actions';
import * as IncomeActions from './income.actions';

@Injectable()
export class IncomeEffects {

	private incomeEndPoint = environment.api.concat('income');

	constructor(private actions: Actions, private http: HttpClient) { }

	@Effect()
	createIncome = this.actions.pipe(
		ofType(IncomeActions.IncomeActionsEnum.CREATE_INCOME),
		map((action: IncomeActions.CreateIncome) => {
			return action.payload;
		}),
		pipe(
			switchMap((income: Income) => {
				return this.http.post<Income>(this.incomeEndPoint.concat('/create'), income);
			}),
			map(() => {
				return {
					type: AlertActionsEnum.SHOW_ALERT_SUCESS,
					payload: 'Income saved'
				}
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on save income'));
			})
		)
	);

	@Effect()
	updateIncome = this.actions.pipe(
		ofType(IncomeActions.IncomeActionsEnum.UPDATE_INCOME),
		map((action: IncomeActions.UpdateIncome) => {
			return action.payload;
		}),
		pipe(
			switchMap((inc: Income) => {
				return this.http.post<Income>(this.incomeEndPoint.concat('/update'), inc);
			}),
			map(() => {
				return {
					type: AlertActionsEnum.SHOW_ALERT_SUCESS,
					payload: 'Income edited'
				}
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on edit income'));
			})
		)
	);

	@Effect()
	deleteIncome = this.actions.pipe(
		ofType(IncomeActions.IncomeActionsEnum.DELETE_INCOME),
		map((action: IncomeActions.DeleteIncome) => {
			return action.payload;
		}),
		pipe(
			switchMap((id: number) => {
				return this.http.delete(this.incomeEndPoint.concat('/delete/').concat(id.toString()));
			}),
			map(() => {
				return {
					type: AlertActionsEnum.SHOW_ALERT_SUCESS,
					payload: 'Income deleted'
				}
			}),
			catchError(() => {
				return of(new ShowAlertError('Error on delete income'));
			})
		)
	);

	@Effect()
	listIncomes = this.actions.pipe(
		ofType(IncomeActions.IncomeActionsEnum.LIST_INCOMES),
		switchMap(() => {
			return this.http.get(this.incomeEndPoint.concat('/list'));
		}),
		map((incomes: Income[]) => {
			return {
				type: IncomeActions.IncomeActionsEnum.SET_INCOMES,
				payload: incomes
			}
		})
	);

}
