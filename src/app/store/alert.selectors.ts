import { createSelector } from '@ngrx/store';

import { AlertState } from './alert.reducers';
import { AppState } from './app.reducers';

const alert = (state: AppState) => state.alert;

export const visibleAlert = createSelector(
	alert,
	(state: AlertState) => state.visible
);

export const msgAlert = createSelector(
	alert,
	(state: AlertState) => state.msg
);

export const errorAlert = createSelector(
	alert,
	(state: AlertState) => state.error
);
