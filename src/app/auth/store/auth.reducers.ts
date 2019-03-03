import { AuthActions, AuthActionsEnum } from './auth.actions';

export interface AuthState {
	token: string;
	authenticated: boolean;
}

export const initialAuthState: AuthState = {
	token: null,
	authenticated: false
};

export const authReducers = (state = initialAuthState, action: AuthActions): AuthState => {
	switch (action.type) {
		case (AuthActionsEnum.LOGON): {
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
				token: initialAuthState.token
			}
		}
		default: {
			return state;
		}
	}
}
