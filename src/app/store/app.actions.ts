import { Action } from '@ngrx/store';

export enum AppActionsEnum {
    CLEAR_STORE = '[App] ClearStore'
}

export class ClearStore implements Action {
    readonly type = AppActionsEnum.CLEAR_STORE;
}

export type AppActions = ClearStore;
