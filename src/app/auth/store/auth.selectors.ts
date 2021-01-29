import { createSelector } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { AuthState } from './auth.reducers';

const authSel = (state: AppState) => state.auth;

export const authLoggedUser = createSelector(
    authSel,
    (state: AuthState) => state.loggedUser
);
