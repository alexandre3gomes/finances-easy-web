import { Action } from '@ngrx/store';

import { Page } from '../../../shared/model/pagination/page.model';
import { Pagination } from '../../../shared/model/pagination/pagination.model';
import { Savings } from '../../../shared/model/savings.model';

export enum SavingsActionsEnum {
	CREATE_SAVINGS = '[Savings] SaveSavings',
	UPDATE_SAVINGS = '[Savings] EditSavings',
	DELETE_SAVINGS = '[Savings] DeleteSavings',
	LIST_SAVINGS = '[Savings] ListSavings',
	RESET_SAVINGS = '[Savings] ResetSavings',
	ADD_SAVINGSS = '[Savings] AddSavingss',
	ADD_SAVINGS = '[Savings] AddSavings',
	ALTER_SAVINGS = '[Savings] AlterSavings',
	REMOVE_SAVINGS = '[Savings] RemoveSavings'
}

export class CreateSavings implements Action {
	public readonly type = SavingsActionsEnum.CREATE_SAVINGS;
	constructor(public payload: Savings) { }
}

export class UpdateSavings implements Action {
	public readonly type = SavingsActionsEnum.UPDATE_SAVINGS;
	constructor(public payload: Savings) { }
}

export class DeleteSavings implements Action {
	public readonly type = SavingsActionsEnum.DELETE_SAVINGS;
	constructor(public payload: number) { }
}

export class ListSavings implements Action {
	public readonly type = SavingsActionsEnum.LIST_SAVINGS;
	constructor(public payload: Pagination) { }
}

export class AddSavingss implements Action {
	public readonly type = SavingsActionsEnum.ADD_SAVINGSS;
	constructor(public payload: Page) { }
}

export class ResetSavings implements Action {
	public readonly type = SavingsActionsEnum.RESET_SAVINGS;
}

export class AddSavings implements Action {
	public readonly type = SavingsActionsEnum.ADD_SAVINGS;
	constructor(public payload: Savings) { }
}

export class AlterSavings implements Action {
	public readonly type = SavingsActionsEnum.ALTER_SAVINGS;
	constructor(public payload: Savings) { }
}

export class RemoveSavings implements Action {
	public readonly type = SavingsActionsEnum.REMOVE_SAVINGS;
	constructor(public payload: number) { }
}

export type SavingsActions = CreateSavings |
	UpdateSavings |
	DeleteSavings |
	ListSavings |
	ResetSavings |
	AddSavingss |
	AddSavings |
	AlterSavings |
	RemoveSavings;
