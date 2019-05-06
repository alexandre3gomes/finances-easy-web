import { createSelector } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import { CategoryState } from './category.reducers';

const categoryState = (state: AppState) => state.category;

export const categories = createSelector(
	categoryState,
	(state: CategoryState) => state.categories
);

export const page = createSelector(
	categoryState,
	(state: CategoryState) => state.page
);
