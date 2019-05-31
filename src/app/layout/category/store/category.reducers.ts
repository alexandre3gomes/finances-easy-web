import { Category } from '../../../shared/model/category.model';
import { Page } from '../../../shared/model/pagination/page.model';
import { CategoryActions, CategoryActionsEnum } from './category.actions';

export interface CategoryState {
	categories: Category[];
	page: Page;
}

export const initialCategoryState: CategoryState = {
	categories: [],
	page: null
};

export function categoryReducers(state = initialCategoryState, action: CategoryActions): CategoryState {
	switch (action.type) {
		case (CategoryActionsEnum.RESET_CATEGORIES): {
			return {
				...state,
				categories: initialCategoryState.categories,
				page: initialCategoryState.page
			};
		}
		case (CategoryActionsEnum.ADD_CATEGORIES): {
			return {
				...state,
				categories: [...state.categories, ...action.payload.content],
				page: action.payload
			};
		}
		case (CategoryActionsEnum.ADD_CATEGORY): {
			const newCategories = [...state.categories];
			newCategories.pop();
			return {
				...state,
				categories: [action.payload, ...newCategories]
			};
		}
		case (CategoryActionsEnum.ALTER_CATEGORY): {
			const newCategories = [...state.categories];
			return {
				...state,
				categories: newCategories.sort((cat1, cat2) => cat2.id - cat1.id)
			};
		}
		case (CategoryActionsEnum.REMOVE_CATEGORY): {
			const newCategories = [...state.categories];
			const deletedCategory = newCategories.filter((elem) => elem.id === action.payload);
			newCategories.splice(newCategories.indexOf(deletedCategory[0]), 1);
			return {
				...state,
				categories: newCategories
			};
		}
		default: {
			return state;
		}
	}
}
