import { createSelector } from '@ngrx/store';

import { AlertState } from './alert.reducers';
import { AppState } from './app.reducers';

const alertSel = (state: AppState) => state.alert;

export const visibleAlert = createSelector(
    alertSel,
    (state: AlertState) => state.visible
);

export const msgAlert = createSelector(
    alertSel,
    (state: AlertState) => state.msg
);

export const errorAlert = createSelector(
    alertSel,
    (state: AlertState) => state.error
);
