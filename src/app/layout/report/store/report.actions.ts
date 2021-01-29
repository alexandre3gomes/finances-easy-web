import { Action } from '@ngrx/store';

import { CategoryAggregValues } from '../../../shared/model/report/category-aggreg-values.model';

export enum ReportActionsEnum {
    LIST_CATEGORY_AGGREG_VALUE = '[Report] ListCategoryAggregValues',
    ADD_CATEGORY_AGGREG_VALUE = '[Report] AddCategoryAggregValues',
    LIST_INCOME_PERIOD = '[Report] ListIncomePeriod',
    ADD_INCOME_PERIOD = '[Report] AddIncomePeriod',
}

export class ListCategoryAggregValues implements Action {
    public readonly type = ReportActionsEnum.LIST_CATEGORY_AGGREG_VALUE;

    constructor(public payload: number) { }
}

export class AddCategoryAggregValues implements Action {
    public readonly type = ReportActionsEnum.ADD_CATEGORY_AGGREG_VALUE;

    constructor(public payload: CategoryAggregValues[]) { }
}

export class ListIncomePeriod implements Action {
    public readonly type = ReportActionsEnum.LIST_INCOME_PERIOD;

    constructor(public payload: number) { }
}

export class AddIncomePeriod implements Action {
    public readonly type = ReportActionsEnum.ADD_INCOME_PERIOD;

    constructor(public payload: Array<number>) { }
}

export type ReportActions = ListCategoryAggregValues | AddCategoryAggregValues | ListIncomePeriod | AddIncomePeriod;
