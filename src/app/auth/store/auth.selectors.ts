import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';

import { AuthState } from './auth.reducers';

const auth = (state: AppState) => state.auth;

export const authToken = createSelector(
	auth,
	(state: AuthState) => state.token
);

export const authAuthenticated = createSelector(
	auth,
	(state: AuthState) => state.authenticated
);
