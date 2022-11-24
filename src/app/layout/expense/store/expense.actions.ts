import { Action } from '@ngrx/store';
import { Expense } from '../../../shared/model/expense.model';
import { Page } from '../../../shared/model/pagination/page.model';
import { Pagination } from '../../../shared/model/pagination/pagination.model';

export enum ExpenseActionsEnum {
    CREATE_EXPENSES = '[Expense] SaveExpense',
    UPDATE_EXPENSE = '[Expense] EditExpense',
    DELETE_EXPENSE = '[Expense] DeleteExpense',
    LIST_EXPENSES = '[Expense] ListExpenses',
    RESET_EXPENSES = '[Expense] ResetExpenses',
    ADD_EXPENSES = '[Expense] AddExpenses',
    ADD_EXPENSE = '[Expense] AddExpense',
    ALTER_EXPENSE = '[Expense] AlterExpense',
    REMOVE_EXPENSE = '[Expense] RemoveExpense',
    IMPORT_EXPENSE = '[Expense] ImportExpense',
    ADD_TEMP_EXPENSES = '[Expense] AddTempExpenses',
    BATCH_EXPENSES = '[Expense] BatchExpenses',
    CLEAR_TEMP_EXPENSES = '[Expense] ClearTempExpenses'
}

export class CreateExpense implements Action {
    public readonly type = ExpenseActionsEnum.CREATE_EXPENSES;

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

export class AddExpense implements Action {
    public readonly type = ExpenseActionsEnum.ADD_EXPENSE;

    constructor(public payload: Expense) { }
}

export class AlterExpense implements Action {
    public readonly type = ExpenseActionsEnum.ALTER_EXPENSE;

    constructor(public payload: Expense) { }
}

export class RemoveExpense implements Action {
    public readonly type = ExpenseActionsEnum.REMOVE_EXPENSE;

    constructor(public payload: number) { }
}

export class ImportExpense implements Action {
    public readonly type = ExpenseActionsEnum.IMPORT_EXPENSE;

    constructor(public payload: File) {}
}

export class AddTempExpenses implements Action {
    public readonly type = ExpenseActionsEnum.ADD_TEMP_EXPENSES;

    constructor(public payload: Expense[]) {}
}

export class BatchExpenses implements Action {
    public readonly type = ExpenseActionsEnum.BATCH_EXPENSES;

    constructor(public payload: Expense[]) {}
}

export class ClearTempExpenses implements Action {
    public readonly type = ExpenseActionsEnum.CLEAR_TEMP_EXPENSES;
}

export type ExpenseActions = CreateExpense |
    UpdateExpense |
    DeleteExpense |
    ListExpenses |
    ResetExpenses |
    AddExpenses |
    AddExpense |
    AlterExpense |
    RemoveExpense |
    ImportExpense |
    AddTempExpenses |
    BatchExpenses |
    ClearTempExpenses;
