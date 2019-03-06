import { Action } from '@ngrx/store';

import { Income } from '../../../shared/model/income.model';


export enum IncomeActionsEnum {
	CREATE_INCOME = '[Income] SaveIncome',
	UPDATE_INCOME = '[Income] EditIncome',
	DELETE_INCOME = '[Income] DeleteIncome',
	LIST_INCOMES = '[Income] ListIncomes',
	SET_INCOMES = '[Income] SetIncomes'
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
}

export class SetIncomes implements Action {
	public readonly type = IncomeActionsEnum.SET_INCOMES;
	constructor(public payload: Income[]) { }
}


export type IncomeActions = CreateIncome | UpdateIncome | DeleteIncome | ListIncomes | SetIncomes;
