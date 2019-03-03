import { Action } from '@ngrx/store';

export enum AuthActionsEnum {
	LOGON = '[Auth] logon',
	LOGOFF = '[Auth] logoff'
}

export class Logon implements Action {
	public readonly type = AuthActionsEnum.LOGON;
	constructor(public payload: string) { }
}

export class Logoff implements Action {
	public readonly type = AuthActionsEnum.LOGOFF;
}

export type AuthActions = Logon | Logoff;
