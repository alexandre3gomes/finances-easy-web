import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
 catchError, map, mergeMap, switchMap
} from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Default } from '../../../shared/enum/default.enum';
import { Income } from '../../../shared/model/income.model';
import { AlertActionsEnum, ShowAlertError } from '../../../store/alert.actions';
import * as IncomeActions from './income.actions';
import { IncomeActionsEnum } from './income.actions';

@Injectable()
export class IncomeEffects {
    private incomeEndPoint = environment.api.concat('income');

    constructor(private actions: Actions, private http: HttpClient) { }

    @Effect()
    createIncome = this.actions.pipe(
        ofType(IncomeActionsEnum.CREATE_INCOME),
        map((action: IncomeActions.CreateIncome) => action.payload),
        switchMap((income: Income) => this.http.post<Income>(this.incomeEndPoint, income).pipe(
                mergeMap((inc: Income) => [
                        {
                            type: IncomeActionsEnum.ADD_INCOME,
                            payload: inc
                        },
                        {
                            type: AlertActionsEnum.SHOW_ALERT_SUCESS,
                            payload: 'Income saved'
                        }
                    ]),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on save income'));
                })
            )),
    );

    @Effect()
    updateIncome = this.actions.pipe(
        ofType(IncomeActionsEnum.UPDATE_INCOME),
        map((action: IncomeActions.UpdateIncome) => action.payload),
        switchMap((income: Income) => this.http.post<Income>(this.incomeEndPoint.concat('/update'), income).pipe(
                mergeMap((inc: Income) => [
                        {
                            type: IncomeActionsEnum.ALTER_INCOME,
                            payload: inc
                        },
                        {
                            type: AlertActionsEnum.SHOW_ALERT_SUCESS,
                            payload: 'Income edited'
                        }
                    ]),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on edit income'));
                })
            ))
    );

    @Effect()
    deleteIncome = this.actions.pipe(
        ofType(IncomeActionsEnum.DELETE_INCOME),
        map((action: IncomeActions.DeleteIncome) => action.payload),
        switchMap((id: number) => this.http.delete(this.incomeEndPoint.concat('/').concat(id.toString())).pipe(
                mergeMap(() => [
                        {
                            type: IncomeActionsEnum.REMOVE_INCOME,
                            payload: id
                        },
                        {
                            type: AlertActionsEnum.SHOW_ALERT_SUCESS,
                            payload: 'Income deleted'
                        }
                    ]),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on delete income'));
                })
            )),
    );

    @Effect()
    listIncomes = this.actions.pipe(
        ofType(IncomeActionsEnum.LIST_INCOMES),
        switchMap((action: IncomeActions.ListIncomes) => this.http.get(this.incomeEndPoint, {
                params: new HttpParams().set('page', action.payload.page ? action.payload.page.toString() : Default.START_PAGE.toString())
                    .set('size', action.payload.size ? action.payload.size.toString() : Default.PAGE_SIZE.toString())
            }).pipe(
                map((page: any) => ({
                        type: IncomeActionsEnum.ADD_INCOMES,
                        payload: page
                    })),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Erro on list incomes'));
                })
            )),
    );
}
