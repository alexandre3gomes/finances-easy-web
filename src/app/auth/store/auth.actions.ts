import { Action } from '@ngrx/store';
import { User } from '../../shared/model/user.model';


export enum AuthActionsEnum {
	SET_LOGGED_USER = '[Auth] SetLoggerUser'
}

export class SetLoggerUser implements Action {
	public readonly type = AuthActionsEnum.SET_LOGGED_USER;
	constructor(public payload: User) { }
}

export type AuthActions = SetLoggerUser;
