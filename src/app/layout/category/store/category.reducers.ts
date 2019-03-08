import { Category } from '../../../shared/model/category.model';
import { CategoryActions, CategoryActionsEnum } from './category.actions';

export interface CategoryState {
	categories: Category[];
}

export const initialCategoryState: CategoryState = {
	categories: []
};

export function categoryReducers (state = initialCategoryState, action: CategoryActions): CategoryState {
	switch (action.type) {
		case (CategoryActionsEnum.CREATE_CATEGORY): {
			return {
				...state,
				categories: [ ...state.categories, action.payload ]
			};
		}
		case (CategoryActionsEnum.SET_CATEGORIES): {
			return {
				...state,
				categories: action.payload
			};
		}
		case (CategoryActionsEnum.DELETE_CATEGORY): {
			const oldCategorys = [ ...state.categories ];
			oldCategorys.splice(oldCategorys.indexOf(oldCategorys.find((inc) => inc.id === action.payload)), 1);
			return {
				...state,
				categories: oldCategorys
			};
		}
		default: {
			return state;
		}
	}
}
