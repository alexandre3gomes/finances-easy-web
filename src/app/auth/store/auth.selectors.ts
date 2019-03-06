import { createSelector } from '@ngrx/store';

import { AppState } from '../../store/app.reducers';
import { AuthState } from './auth.reducers';

const authSel = (state: AppState) => state.auth;

export const authToken = createSelector(
	authSel,
	(state: AuthState) => state.token
);

export const authAuthenticated = createSelector(
	authSel,
	(state: AuthState) => state.authenticated
);

export const authLoggedUser = createSelector(
	authSel,
	(state: AuthState) => state.loggedUser
);
