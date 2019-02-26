import { RouterReducerState } from '@ngrx/router-store';
import { AlertState, initialAlertState } from './alert.state';

export interface AppState {
	router?: RouterReducerState;
	alert: AlertState;
}

export const initialAppState: AppState = {
	alert: initialAlertState
};

export function getInitialState(): AppState {
	return initialAppState;
}
