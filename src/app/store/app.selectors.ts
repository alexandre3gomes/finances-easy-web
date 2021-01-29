import { createSelector } from '@ngrx/store';

import { AppState } from './app.reducers';

const appState = (state: AppState) => state;

export const alert = createSelector(
    appState,
    (state: AppState) => state.alert
);

export const auth = createSelector(
    appState,
    (state: AppState) => state.auth
);

export const income = createSelector(
    appState,
    (state: AppState) => state.income
);

export const category = createSelector(
    appState,
    (state: AppState) => state.category
);

export const expense = createSelector(
    appState,
    (state: AppState) => state.expense
);

export const budget = createSelector(
    appState,
    (state: AppState) => state.budget
);

export const dashboard = createSelector(
    appState,
    (state: AppState) => state.dashboard
);

export const report = createSelector(
    appState,
    (state: AppState) => state.report
);

export const user = createSelector(
    appState,
    (state: AppState) => state.user
);

export const savings = createSelector(
    appState,
    (state: AppState) => state.savings
);
