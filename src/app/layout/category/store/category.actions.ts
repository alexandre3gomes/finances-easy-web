import { Action } from '@ngrx/store';
import { Category } from 'src/app/shared/model/category.model';

export enum CategoryActionsEnum {
	CREATE_CATEGORY = '[Category] SaveCategory',
	UPDATE_CATEGORY = '[Category] EditCategory',
	DELETE_CATEGORY = '[Category] DeleteCategory',
	LIST_CATEGORIES = '[Category] ListCategories',
	SET_CATEGORIES = '[Category] SetCategories'
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
}

export class SetCategories implements Action {
	public readonly type = CategoryActionsEnum.SET_CATEGORIES;
	constructor(public payload: Category[]) { }
}


export type CategoryActions = CreateCategory | UpdateCategory | DeleteCategory | ListCategories | SetCategories;
