import { Action } from '@ngrx/store';

import { User } from '../../shared/model/user.model';

export enum AuthActionsEnum {
	LOGON = '[Auth] Logon',
	LOGOFF = '[Auth] Logoff',
	SET_TOKEN = '[Auth] SetToken',
	LOAD_CURRENT_USER = '[Auth] LoadCurrentUser',
	SET_LOGGED_USER = '[Auth] SetLoggedUser'
}

export class Logon implements Action {
	public readonly type = AuthActionsEnum.LOGON;
	constructor(public payload: User) { }
}

export class Logoff implements Action {
	public readonly type = AuthActionsEnum.LOGOFF;
}

export class SetToken implements Action {
	public readonly type = AuthActionsEnum.SET_TOKEN;
	constructor(public payload: string) { }
}

export class LoadCurrentUser implements Action {
	public readonly type = AuthActionsEnum.LOAD_CURRENT_USER;
}

export class SetLoggedUser implements Action {
	public readonly type = AuthActionsEnum.SET_LOGGED_USER;
	constructor(public payload: User) { }
}

export type AuthActions = Logon | Logoff | SetToken | LoadCurrentUser | SetLoggedUser;
