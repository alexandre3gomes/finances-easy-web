import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { alertReducers } from './alert.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
	router: routerReducer,
	alert: alertReducers
};
