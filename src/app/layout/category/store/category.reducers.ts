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

export function categoryReducers (state = initialCategoryState, action: CategoryActions): CategoryState {
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
				categories: [ ...state.categories, ...action.payload.content ],
				page: action.payload
			};
		}
		default: {
			return state;
		}
	}
}
