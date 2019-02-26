import { AlertState } from '../state/alert.state';
import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';

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
