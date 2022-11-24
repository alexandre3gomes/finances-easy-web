import { createSelector } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import { ExpenseState } from './expense.reducers';

const expenseState = (state: AppState) => state.expense;

export const expenses = createSelector(
    expenseState,
    (state: ExpenseState) => state.expenses
);

export const page = createSelector(
    expenseState,
    (state: ExpenseState) => state.page
);

export const tempExpenses = createSelector(
    expenseState,
    (state: ExpenseState) => state.tempExpenses
);
