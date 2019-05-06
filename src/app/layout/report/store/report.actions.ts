import { Action } from '@ngrx/store';
import { CategoryAggregValues } from '../../../shared/model/report/category-aggreg-values.model';

export enum ReportActionsEnum {
	LIST_CATEGORY_AGGREG_VALUE = '[Report] ListCategoryAggregValues',
	ADD_CATEGORY_AGGREG_VALUE = '[Report] AddCategoryAggregValues'
}

export class ListCategoryAggregValues implements Action {
	public readonly type = ReportActionsEnum.LIST_CATEGORY_AGGREG_VALUE;
	constructor(public payload: number) { }
}

export class AddCategoryAggregValues implements Action {
	public readonly type = ReportActionsEnum.ADD_CATEGORY_AGGREG_VALUE;
	constructor(public payload: CategoryAggregValues[]) { }
}

export type ReportActions = ListCategoryAggregValues | AddCategoryAggregValues;
