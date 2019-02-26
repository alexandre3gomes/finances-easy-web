import { Action } from '@ngrx/store';

export enum AlertActionsEnum {
	GetAlert = '[Alert] getAlert',
	ShowAlertSucess = '[Alert] showAlertSucess',
	ShowAlertError = '[Alert] showAlertError',
	HideAlert = '[Alert] hideAlert'
}

export class GetAlert implements Action {
	public readonly type = AlertActionsEnum.GetAlert;
}

export class ShowAlertSuccess implements Action {
	public readonly type = AlertActionsEnum.ShowAlertSucess;
	constructor(public payload: string) {}
}

export class ShowAlertError implements Action {
	public readonly type = AlertActionsEnum.ShowAlertError;
	constructor(public payload: string) {}
}

export class HideAlert implements Action {
	public readonly type = AlertActionsEnum.HideAlert;
}

export type AlertActions = GetAlert | ShowAlertSuccess | ShowAlertError | HideAlert;
