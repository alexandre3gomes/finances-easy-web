import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import {
 catchError, map, mergeMap, switchMap
} from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { Expense } from '../../../shared/model/expense.model';
import { Income } from '../../../shared/model/income.model';
import { CategoryAggregValues } from '../../../shared/model/report/category-aggreg-values.model';
import { ShowAlertError } from '../../../store/alert.actions';
import {
    DashboardActionsEnum,
    FetchData,
    FetchTotalSavings,
    ListActualCategories,
    ListActualExpenses,
} from './dashboard.actions';

@Injectable()
export class DashboardEffects {
    private dashboardEndpoint = environment.api.concat('dashboard');

    constructor(private actions: Actions, private http: HttpClient) { }

    @Effect()
    fetchData = this.actions.pipe(
        ofType(DashboardActionsEnum.FETCH_DATA),
        map((action: FetchData) => action),
        switchMap(() => this.http.get<Income[]>(this.dashboardEndpoint.concat('/actualIncome')).pipe(
                mergeMap((incomes: Income[]) => {
                    if(incomes.length <= 0) {
                        return EMPTY;
                    }
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
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on list actual incomes'));
                })
            ))
    );

    @Effect()
    listActualExpenses = this.actions.pipe(
        ofType(DashboardActionsEnum.LIST_ACTUAL_EXPENSES),
        map((action: ListActualExpenses) => action),
        switchMap(() => this.http.get<Expense[]>(this.dashboardEndpoint.concat('/actualExpense')).pipe(
                mergeMap((expenses: Expense[]) => [
                        {
                            type: DashboardActionsEnum.ADD_ACTUAL_EXPENSES,
                            payload: expenses
                        },
                        {
                            type: DashboardActionsEnum.LIST_ACTUAL_CATEGORIES
                        }
                    ]),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on list actual expenses'));
                })
            ))
    );

    @Effect()
    listActualCategories = this.actions.pipe(
        ofType(DashboardActionsEnum.LIST_ACTUAL_CATEGORIES),
        map((action: ListActualCategories) => action),
        switchMap(() => this.http.get<CategoryAggregValues[]>(this.dashboardEndpoint.concat('/actualBalance')).pipe(
                mergeMap((expenses: CategoryAggregValues[]) => [
                        {
                            type: DashboardActionsEnum.ADD_ACTUAL_CATEGORIES,
                            payload: expenses
                        },
                        {
                            type: DashboardActionsEnum.FETCH_TOTAL_SAVINGS
                        }
                    ]),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on list actual categories'));
                })
            ))
    );

    @Effect()
    setTotalSavings = this.actions.pipe(
        ofType(DashboardActionsEnum.FETCH_TOTAL_SAVINGS),
        map((action: FetchTotalSavings) => action),
        switchMap(() => this.http.get<number>(this.dashboardEndpoint.concat('/totalSavings')).pipe(
                mergeMap((total: number) => [
                        {
                            type: DashboardActionsEnum.SET_TOTAL_SAVINGS,
                            payload: total
                        },
                        {
                            type: DashboardActionsEnum.DATA_FETCHED
                        }
                    ]),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on fetch total savings'));
                })
            ))
    );
}
