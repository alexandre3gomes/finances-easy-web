import { Action } from '@ngrx/store';
import { Income } from '../../../shared/model/income.model';
import { Page } from '../../../shared/model/pagination/page.model';
import { Pagination } from '../../../shared/model/pagination/pagination.model';




export enum IncomeActionsEnum {
	CREATE_INCOME = '[Income] SaveIncome',
	UPDATE_INCOME = '[Income] EditIncome',
	DELETE_INCOME = '[Income] DeleteIncome',
	LIST_INCOMES = '[Income] ListIncomes',
	RESET_INCOMES = '[Income] ResetIncomes',
	ADD_INCOMES = '[Income] AddIncomes'
}

export class CreateIncome implements Action {
	public readonly type = IncomeActionsEnum.CREATE_INCOME;
	constructor(public payload: Income) { }
}

export class UpdateIncome implements Action {
	public readonly type = IncomeActionsEnum.UPDATE_INCOME;
	constructor(public payload: Income) { }
}

export class DeleteIncome implements Action {
	public readonly type = IncomeActionsEnum.DELETE_INCOME;
	constructor(public payload: number) { }
}

export class ListIncomes implements Action {
	public readonly type = IncomeActionsEnum.LIST_INCOMES;
	constructor(public payload: Pagination) { }
}

export class AddIncomes implements Action {
	public readonly type = IncomeActionsEnum.ADD_INCOMES;
	constructor(public payload: Page) { }
}

export class ResetIncomes implements Action {
	public readonly type = IncomeActionsEnum.RESET_INCOMES;
}

export type IncomeActions = CreateIncome |
	UpdateIncome |
	DeleteIncome |
	ListIncomes |
	ResetIncomes |
	AddIncomes;
