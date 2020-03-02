import { Action } from '@ngrx/store';

import { Expense } from '../../../shared/model/expense.model';
import { Income } from '../../../shared/model/income.model';
import { CategoryAggregValues } from '../../../shared/model/report/category-aggreg-values.model';


export enum DashboardActionsEnum {
	FETCH_DATA = '[Dashboard] FetchData',
	LIST_ACTUAL_EXPENSES = '[Dashboard] ListActualExpenses',
	LIST_ACTUAL_CATEGORIES = '[Dashboard] ListActualCategories',
	FETCH_TOTAL_SAVINGS = '[Dashboard] FetchTotalSavings',
	ADD_ACTUAL_INCOMES = '[Dashboard] AddActualIncomes',
	ADD_ACTUAL_EXPENSES = '[Dashboard] AddActualExpenses',
	ADD_ACTUAL_CATEGORIES = '[Dashboard] AddActualCategories',
	SET_TOTAL_SAVINGS = '[Dashboard] SetTotalSavings',
	DATA_FETCHED = '[Dashboard] DataFetched',
	RESET_DATA = '[Dashboard] ResetData'
}

export class FetchData implements Action {
	public readonly type = DashboardActionsEnum.FETCH_DATA;
}

export class ListActualExpenses implements Action {
	public readonly type = DashboardActionsEnum.LIST_ACTUAL_EXPENSES;
}

export class ListActualCategories implements Action {
	public readonly type = DashboardActionsEnum.LIST_ACTUAL_CATEGORIES;
}

export class FetchTotalSavings implements Action {
	public readonly type = DashboardActionsEnum.FETCH_TOTAL_SAVINGS;
}

export class AddActualIncomes implements Action {
	public readonly type = DashboardActionsEnum.ADD_ACTUAL_INCOMES;
	constructor(public payload: Income[]) { }
}

export class AddActualExpenses implements Action {
	public readonly type = DashboardActionsEnum.ADD_ACTUAL_EXPENSES;
	constructor(public payload: Expense[]) { }
}

export class AddActualCategories implements Action {
	public readonly type = DashboardActionsEnum.ADD_ACTUAL_CATEGORIES;
	constructor(public payload: CategoryAggregValues[]) { }
}

export class SetTotalSavings implements Action {
	public readonly type = DashboardActionsEnum.SET_TOTAL_SAVINGS;
	constructor(public payload: number) { }
}

export class DataFetched implements Action {
	public readonly type = DashboardActionsEnum.DATA_FETCHED;
}

export class ResetData implements Action {
	public readonly type = DashboardActionsEnum.RESET_DATA;
}

export type DashboardActions = FetchData | ListActualExpenses | ListActualCategories | AddActualIncomes | AddActualExpenses | AddActualCategories | SetTotalSavings | DataFetched | ResetData;
