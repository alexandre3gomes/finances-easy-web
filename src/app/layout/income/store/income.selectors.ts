import { createSelector } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import { IncomeState } from './income.reducers';

const incomeState = (state: AppState) => state.income;

export const incomes = createSelector(
    incomeState,
    (state: IncomeState) => state.incomes
);

export const page = createSelector(
    incomeState,
    (state: IncomeState) => state.page
);
