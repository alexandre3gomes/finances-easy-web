import { Action } from '@ngrx/store';
import { Category } from 'src/app/shared/model/category.model';
import { Page } from '../../../shared/model/pagination/page.model';
import { Pagination } from '../../../shared/model/pagination/pagination.model';

export enum CategoryActionsEnum {
	CREATE_CATEGORY = '[Category] SaveCategory',
	UPDATE_CATEGORY = '[Category] EditCategory',
	DELETE_CATEGORY = '[Category] DeleteCategory',
	LIST_CATEGORIES = '[Category] ListCategories',
	RESET_CATEGORIES = '[Category] ResetCategories',
	ADD_CATEGORIES = '[Category] AddCategories'
}

export class CreateCategory implements Action {
	public readonly type = CategoryActionsEnum.CREATE_CATEGORY;
	constructor(public payload: Category) { }
}

export class UpdateCategory implements Action {
	public readonly type = CategoryActionsEnum.UPDATE_CATEGORY;
	constructor(public payload: Category) { }
}

export class DeleteCategory implements Action {
	public readonly type = CategoryActionsEnum.DELETE_CATEGORY;
	constructor(public payload: number) { }
}

export class ListCategories implements Action {
	public readonly type = CategoryActionsEnum.LIST_CATEGORIES;
	constructor(public payload: Pagination) { }
}

export class AddCategories implements Action {
	public readonly type = CategoryActionsEnum.ADD_CATEGORIES;
	constructor(public payload: Page) { }
}

export class ResetCategories implements Action {
	public readonly type = CategoryActionsEnum.RESET_CATEGORIES;
}

export type CategoryActions = CreateCategory |
	UpdateCategory |
	DeleteCategory |
	ListCategories |
	ResetCategories |
	AddCategories;
