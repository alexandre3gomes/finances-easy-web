import { Action } from '@ngrx/store';
import { Expense } from '../../../shared/model/expense.model';
import { Income } from '../../../shared/model/income.model';

export enum DashboardActionsEnum {
	LIST_ACTUAL_INCOMES = '[Dashboard] ListActualIncomes',
	LIST_ACTUAL_EXPENSES = '[Dashboard] ListActualExpenses',
	ADD_ACTUAL_INCOMES = '[Dashboard] AddActualIncomes',
	ADD_ACTUAL_EXPENSES = '[Dashboard] AddActualExpenses',
	RESET_DATA = '[Dashboard] ResetData'
}

export class ListActualIncomes implements Action {
	public readonly type = DashboardActionsEnum.LIST_ACTUAL_INCOMES;
}

export class ListActualExpenses implements Action {
	public readonly type = DashboardActionsEnum.LIST_ACTUAL_EXPENSES;
}

export class AddActualIncomes implements Action {
	public readonly type = DashboardActionsEnum.ADD_ACTUAL_INCOMES;
	constructor(public payload: Income[]) { }
}

export class AddActualExpenses implements Action {
	public readonly type = DashboardActionsEnum.ADD_ACTUAL_EXPENSES;
	constructor(public payload: Expense[]) { }
}

export class ResetData implements Action {
	public readonly type = DashboardActionsEnum.RESET_DATA;
}

export type DashboardActions = ListActualIncomes | ListActualExpenses | AddActualIncomes | AddActualExpenses | ResetData;
