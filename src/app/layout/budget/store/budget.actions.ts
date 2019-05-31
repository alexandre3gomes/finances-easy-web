import { Action } from '@ngrx/store';
import { Budget } from 'src/app/shared/model/budget/budget.model';

import { Page } from '../../../shared/model/pagination/page.model';
import { Pagination } from '../../../shared/model/pagination/pagination.model';

export enum BudgetActionsEnum {
	CREATE_BUDGET = '[Budget] SaveBudget',
	UPDATE_BUDGET = '[Budget] EditBudget',
	DELETE_BUDGET = '[Budget] DeleteBudget',
	LIST_BUDGETS = '[Budget] ListBudgets',
	RESET_BUDGETS = '[Budget] ResetBudgets',
	ADD_BUDGETS = '[Budget] AddBudgets',
	ADD_BUDGET = '[Budget] AddBudget',
	ALTER_BUDGET = '[Budget] AlterBudget',
	REMOVE_BUDGET = '[Budget] RemoveBudget'
}

export class CreateBudget implements Action {
	public readonly type = BudgetActionsEnum.CREATE_BUDGET;
	constructor(public payload: Budget) { }
}

export class UpdateBudget implements Action {
	public readonly type = BudgetActionsEnum.UPDATE_BUDGET;
	constructor(public payload: Budget) { }
}

export class DeleteBudget implements Action {
	public readonly type = BudgetActionsEnum.DELETE_BUDGET;
	constructor(public payload: number) { }
}

export class ListBudgets implements Action {
	public readonly type = BudgetActionsEnum.LIST_BUDGETS;
	constructor(public payload: Pagination) { }
}

export class AddBudgets implements Action {
	public readonly type = BudgetActionsEnum.ADD_BUDGETS;
	constructor(public payload: Page) { }
}

export class ResetBudgets implements Action {
	public readonly type = BudgetActionsEnum.RESET_BUDGETS;
}

export class AddBudget implements Action {
	public readonly type = BudgetActionsEnum.ADD_BUDGET;
	constructor(public payload: Budget) { }
}

export class AlterBudget implements Action {
	public readonly type = BudgetActionsEnum.ALTER_BUDGET;
	constructor(public payload: Budget) { }
}

export class RemoveBudget implements Action {
	public readonly type = BudgetActionsEnum.REMOVE_BUDGET;
	constructor(public payload: number) { }
}

export type BudgetActions = CreateBudget |
	UpdateBudget |
	DeleteBudget |
	ListBudgets |
	ResetBudgets |
	AddBudgets |
	AddBudget |
	AlterBudget |
	RemoveBudget;
