import { User } from 'src/app/shared/model/user.model';

import { AuthActions, AuthActionsEnum } from './auth.actions';

export interface AuthState {
	authenticated: boolean;
	loggedUser: User;
}

export const initialAuthState: AuthState = {
	authenticated: false,
	loggedUser: new User(-1, '', '', '', '')
};

export function authReducers(state = initialAuthState, action: AuthActions): AuthState {
	switch (action.type) {
		case (AuthActionsEnum.SET_AUTHENTICATED): {
			return {
				...state,
				loggedUser: action.payload,
				authenticated: true
			};
		}
		case (AuthActionsEnum.LOGOUT): {
			return {
				...state,
				authenticated: false
			};
		}
		default: {
			return state;
		}
	}
}
