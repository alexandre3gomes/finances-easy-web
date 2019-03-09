import { Action } from '@ngrx/store';
import { User } from '../../shared/model/user.model';


export enum AuthActionsEnum {
	LOGON = '[Auth] Logon',
	LOGOUT = '[Auth] Logout',
	SET_AUTHENTICATED = '[Auth] SetAuthenticated',
	LOAD_CURRENT_USER = '[Auth] LoadCurrentUser',
	SET_LOGGED_USER = '[Auth] SetLoggedUser'
}

export class Logon implements Action {
	public readonly type = AuthActionsEnum.LOGON;
	constructor(public payload: User) { }
}

export class Logout implements Action {
	public readonly type = AuthActionsEnum.LOGOUT;
}

export class SetAuthenticated implements Action {
	public readonly type = AuthActionsEnum.SET_AUTHENTICATED;
	constructor(public payload: boolean) { }
}

export class LoadCurrentUser implements Action {
	public readonly type = AuthActionsEnum.LOAD_CURRENT_USER;
}

export class SetLoggedUser implements Action {
	public readonly type = AuthActionsEnum.SET_LOGGED_USER;
	constructor(public payload: User) { }
}

export type AuthActions = Logon | Logout | SetAuthenticated | LoadCurrentUser | SetLoggedUser;
