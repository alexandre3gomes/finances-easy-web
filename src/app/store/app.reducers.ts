import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { authReducers, AuthState, initialAuthState } from '../auth/store/auth.reducers';
import { incomeReducers, IncomeState, initialIncomeState } from '../layout/income/store/income.reducers';
import { alertReducers, AlertState, initialAlertState } from './alert.reducers';

export interface AppState {
	router?: RouterReducerState;
	alert: AlertState;
	auth: AuthState;
	income: IncomeState;
}

export const initialAppState: AppState = {
	alert: initialAlertState,
	auth: initialAuthState,
	income: initialIncomeState
};

export function getInitialState(): AppState {
	return initialAppState;
}

export const appReducers: ActionReducerMap<AppState, any> = {
	router: routerReducer,
	alert: alertReducers,
	auth: authReducers,
	income: incomeReducers
};
