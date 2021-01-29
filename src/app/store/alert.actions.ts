import { Action } from '@ngrx/store';

export enum AlertActionsEnum {
    GET_ALERT = '[Alert] GetAlert',
    SHOW_ALERT_SUCESS = '[Alert] ShowAlertSucess',
    SHOW_ALERT_ERROR = '[Alert] ShowAlertError',
    HIDE_ALERT = '[Alert] HideAlert'
}

export class GetAlert implements Action {
    public readonly type = AlertActionsEnum.GET_ALERT;
}

export class ShowAlertSuccess implements Action {
    public readonly type = AlertActionsEnum.SHOW_ALERT_SUCESS;

    constructor(public payload: string) { }
}

export class ShowAlertError implements Action {
    public readonly type = AlertActionsEnum.SHOW_ALERT_ERROR;

    constructor(public payload: string) { }
}

export class HideAlert implements Action {
    public readonly type = AlertActionsEnum.HIDE_ALERT;
}

export type AlertActions = GetAlert | ShowAlertSuccess | ShowAlertError | HideAlert;
