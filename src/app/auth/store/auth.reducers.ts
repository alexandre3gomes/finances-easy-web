import { User } from 'src/app/shared/model/user.model';
import { AuthActions, AuthActionsEnum } from './auth.actions';


export interface AuthState {
	token: string;
	authenticated: boolean;
	loggedUser: User;
}

export const initialAuthState: AuthState = {
	token: null,
	authenticated: true,
	loggedUser: new User(-11, '', '', '', '')
};

export function authReducers (state = initialAuthState, action: AuthActions): AuthState {
	switch (action.type) {
		case (AuthActionsEnum.SET_TOKEN): {
			return {
				...state,
				authenticated: true,
				token: action.payload
			};
		}
		case (AuthActionsEnum.LOGOFF): {
			return {
				...state,
				authenticated: false,
				token: null
			};
		}
		case (AuthActionsEnum.SET_LOGGED_USER): {
			return {
				...state,
				loggedUser: action.payload
			};
		}
		default: {
			return state;
		}
	}
}
