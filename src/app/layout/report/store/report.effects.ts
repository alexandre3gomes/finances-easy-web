import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { CategoryAggregValues } from '../../../shared/model/report/category-aggreg-values.model';
import { ShowAlertError } from '../../../store/alert.actions';
import { ListCategoryAggregValues, ListIncomePeriod, ReportActionsEnum } from './report.actions';

@Injectable()
export class ReportEffects {
    private reportEndpoint = environment.api.concat('report');

    constructor(private actions: Actions, private http: HttpClient) {
    }

    @Effect()
    listCategoryAggregValue = this.actions.pipe(
        ofType(ReportActionsEnum.LIST_CATEGORY_AGGREG_VALUE),
        switchMap((action: ListCategoryAggregValues) => this.http.get(this.reportEndpoint.concat('/byCategory/')
            .concat(action.payload.toString())).pipe(
            map((list: CategoryAggregValues[]) => ({
                type: ReportActionsEnum.ADD_CATEGORY_AGGREG_VALUE,
                payload: list
            })),
            catchError((err) => {
                console.error(err);
                return of(new ShowAlertError('Error on list category aggregate values'));
            })
        ))
    );

    @Effect()
    listIncomePeriod = this.actions.pipe(
        ofType(ReportActionsEnum.LIST_INCOME_PERIOD),
        switchMap((action: ListIncomePeriod) => this.http.get(this.reportEndpoint.concat('/byPeriod/')
            .concat(action.payload.toString())).pipe(
            map((list: Array<number>) => ({
                type: ReportActionsEnum.ADD_INCOME_PERIOD,
                payload: list
            })),
            catchError((err) => {
                console.error(err);
                return of(new ShowAlertError('Error on list incomes by period'));
            })
        ))
    );
}
