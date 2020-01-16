import { User } from 'src/app/shared/model/user.model';

import { environment } from '../../../environments/environment';
import { AuthActions, AuthActionsEnum } from './auth.actions';

export interface AuthState {
	authenticated: boolean;
	loggedUser: User;
}

export const initialAuthState: AuthState = environment.production ? {
	authenticated: false,
	loggedUser: new User(-1, '', '', '', '')
} : {
	authenticated: true,
		loggedUser: new User(1, 'Alexandre', 'alexandre', '123456', '7cd2f9e1-a6e9-4675-9176-b9219b0fd8d8')
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
