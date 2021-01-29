import { createSelector } from '@ngrx/store';

import { AppState } from '../../../store/app.reducers';
import { SavingsState } from './savings.reducers';

const savingsState = (state: AppState) => state.savings;

export const savings = createSelector(
    savingsState,
    (state: SavingsState) => state.savings
);

export const page = createSelector(
    savingsState,
    (state: SavingsState) => state.page
);
