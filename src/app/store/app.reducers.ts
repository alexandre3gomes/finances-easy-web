import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { authReducers, AuthState, initialAuthState } from '../auth/store/auth.reducers';
import { alertReducers, AlertState, initialAlertState } from '../layout/store/alert.reducers';

export interface AppState {
	router?: RouterReducerState;
	alert: AlertState;
	auth: AuthState;
}

export const initialAppState: AppState = {
	alert: initialAlertState,
	auth: initialAuthState
};

export function getInitialState(): AppState {
	return initialAppState;
}

export const appReducers: ActionReducerMap<AppState, any> = {
	router: routerReducer,
	alert: alertReducers,
	auth: authReducers
};
