import { createSelector } from '@ngrx/store';

import { AppState } from '../../store/app.reducers';
import { AlertState } from './alert.reducers';

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
