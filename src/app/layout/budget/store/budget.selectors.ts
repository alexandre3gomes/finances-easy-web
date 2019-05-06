import { createSelector } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import { BudgetState } from './budget.reducers';

const budgetState = (state: AppState) => state.budget;

export const budgets = createSelector(
	budgetState,
	(state: BudgetState) => state.budgets
);

export const page = createSelector(
	budgetState,
	(state: BudgetState) => state.page
);
