import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Default } from '../../../shared/enum/default.enum';
import { Savings } from '../../../shared/model/savings.model';
import { AlertActionsEnum, ShowAlertError } from '../../../store/alert.actions';
import * as SavingsActions from './savings.actions';
import { SavingsActionsEnum } from './savings.actions';



@Injectable()
export class SavingsEffects {

	private savingsEndPoint = environment.api.concat('savings');

	constructor(private actions: Actions, private http: HttpClient) { }

	@Effect()
	createSavings = this.actions.pipe(
		ofType(SavingsActionsEnum.CREATE_SAVINGS),
		map((action: SavingsActions.CreateSavings) => {
			return action.payload;
		}),
		switchMap((savings: Savings) => {
			return this.http.post<Savings>(this.savingsEndPoint, savings).pipe(
				mergeMap((sav: Savings) => {
					return [
						{
							type: SavingsActionsEnum.ADD_SAVINGS,
							payload: sav
						},
						{
							type: AlertActionsEnum.SHOW_ALERT_SUCESS,
							payload: 'Savings saved'
						}
					];
				}),
				catchError((err) => {
					console.error(err);
					return of(new ShowAlertError('Error on save savings'));
				})
			);
		}),
	);

	@Effect()
	updateSavings = this.actions.pipe(
		ofType(SavingsActionsEnum.UPDATE_SAVINGS),
		map((action: SavingsActions.UpdateSavings) => {
			return action.payload;
		}),
		switchMap((savings: Savings) => {
			return this.http.post<Savings>(this.savingsEndPoint.concat('/update'), savings).pipe(
				mergeMap((sav: Savings) => {
					return [
						{
							type: SavingsActionsEnum.ALTER_SAVINGS,
							payload: sav
						},
						{
							type: AlertActionsEnum.SHOW_ALERT_SUCESS,
							payload: 'Savings edited'
						}
					];
				}),
				catchError((err) => {
					console.error(err);
					return of(new ShowAlertError('Error on edit savings'));
				})
			);
		})
	);

	@Effect()
	deleteSavings = this.actions.pipe(
		ofType(SavingsActionsEnum.DELETE_SAVINGS),
		map((action: SavingsActions.DeleteSavings) => {
			return action.payload;
		}),
		switchMap((id: number) => {
			return this.http.delete(this.savingsEndPoint.concat('/').concat(id.toString())).pipe(
				mergeMap(() => {
					return [
						{
							type: SavingsActionsEnum.REMOVE_SAVINGS,
							payload: id
						},
						{
							type: AlertActionsEnum.SHOW_ALERT_SUCESS,
							payload: 'Savings deleted'
						}
					];
				}),
				catchError((err) => {
					console.error(err);
					return of(new ShowAlertError('Error on delete savings'));
				})
			);
		}),
	);

	@Effect()
	listSavingss = this.actions.pipe(
		ofType(SavingsActionsEnum.LIST_SAVINGS),
		switchMap((action: SavingsActions.ListSavings) => {
			return this.http.get(this.savingsEndPoint, {
				params: new HttpParams().set('page', action.payload.page ? action.payload.page.toString() : Default.START_PAGE.toString())
					.set('size', action.payload.size ? action.payload.size.toString() : Default.PAGE_SIZE.toString())
			}).pipe(
				map((page: any) => {
					return {
						type: SavingsActionsEnum.ADD_SAVINGSS,
						payload: page
					};
				}),
				catchError((err) => {
					console.error(err);
					return of(new ShowAlertError('Error on list savingss'));
				})
			);
		}),
	);

}
