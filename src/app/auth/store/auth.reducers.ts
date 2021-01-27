import { User } from 'src/app/shared/model/user.model';

import { environment } from '../../../environments/environment';
import { AuthActions, AuthActionsEnum } from './auth.actions';

export interface AuthState {
	loggedUser: User;
}

export const initialAuthState: AuthState = environment.production ? {
	loggedUser: new User(-1, '', '')
} : {
	loggedUser: new User(1, 'Alexandre', 'alexandre')
};

export function authReducers(state = initialAuthState, action: AuthActions): AuthState {
	switch (action.type) {
		case (AuthActionsEnum.SET_LOGGED_USER): {
			return {
				...state,
				loggedUser: action.payload,
			};
		}
		default: {
			return state;
		}
	}
}
