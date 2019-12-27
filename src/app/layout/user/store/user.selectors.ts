import { createSelector } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import { UserState } from './user.reducers';

const userState = (state: AppState) => state.user;

export const users = createSelector(
    userState,
    (state: UserState) => state.users
);

export const page = createSelector(
    userState,
    (state: UserState) => state.page
);
