import { Action } from '@ngrx/store';
import { Expense } from '../../../shared/model/expense.model';



export enum ExpenseActionsEnum {
	CREATE_EXPENSE = '[Expense] SaveExpense',
	UPDATE_EXPENSE = '[Expense] EditExpense',
	DELETE_EXPENSE = '[Expense] DeleteExpense',
	LIST_EXPENSES = '[Expense] ListExpenses',
	SET_EXPENSES = '[Expense] SetExpenses'
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
}

export class SetExpenses implements Action {
	public readonly type = ExpenseActionsEnum.SET_EXPENSES;
	constructor(public payload: Expense[]) { }
}


export type ExpenseActions = CreateExpense | UpdateExpense | DeleteExpense | ListExpenses | SetExpenses;
