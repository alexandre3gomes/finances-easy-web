import { createSelector } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import { DashboardState } from './dashboard.reducers';

const dashboardState = (state: AppState) => state.dashboard;

export const incomes = createSelector(
    dashboardState,
    (state: DashboardState) => state.incomes
);

export const expenses = createSelector(
    dashboardState,
    (state: DashboardState) => state.expenses
);
