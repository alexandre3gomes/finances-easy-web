import { Action } from '@ngrx/store';
import { Expense } from '../../../shared/model/expense.model';
import { Page } from '../../../shared/model/pagination/page.model';
import { Pagination } from '../../../shared/model/pagination/pagination.model';

export enum ExpenseActionsEnum {
	CREATE_EXPENSE = '[Expense] SaveExpense',
	UPDATE_EXPENSE = '[Expense] EditExpense',
	DELETE_EXPENSE = '[Expense] DeleteExpense',
	LIST_EXPENSES = '[Expense] ListExpenses',
	RESET_EXPENSES = '[Expense] ResetExpenses',
	ADD_EXPENSES = '[Expense] AddExpenses'
}

export class CreateExpense implements Action {
	public readonly type = ExpenseActionsEnum.CREATE_EXPENSE;
	constructor(public payload: Expense) { }
}

export class UpdateExpense implements Action {
	public readonly type = ExpenseActionsEnum.UPDATE_EXPENSE;
	constructor(public payload: Expense) { }
}

export class DeleteExpense implements Action {
	public readonly type = ExpenseActionsEnum.DELETE_EXPENSE;
	constructor(public payload: number) { }
}

export class ListExpenses implements Action {
	public readonly type = ExpenseActionsEnum.LIST_EXPENSES;
	constructor(public payload: Pagination) { }
}

export class AddExpenses implements Action {
	public readonly type = ExpenseActionsEnum.ADD_EXPENSES;
	constructor(public payload: Page) { }
}

export class ResetExpenses implements Action {
	public readonly type = ExpenseActionsEnum.RESET_EXPENSES;
}

export type ExpenseActions = CreateExpense |
	UpdateExpense |
	DeleteExpense |
	ListExpenses |
	ResetExpenses |
	AddExpenses;
