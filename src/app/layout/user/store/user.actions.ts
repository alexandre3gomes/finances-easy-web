import { Action } from '@ngrx/store';
import { User } from 'src/app/shared/model/user.model';
import { Pagination } from 'src/app/shared/model/pagination/pagination.model';
import { Page } from 'src/app/shared/model/pagination/page.model';

export enum UserActionsEnum {
    CREATE_USER = '[User] SaveUser',
    UPDATE_USER = '[User] EditUser',
    DELETE_USER = '[User] DeleteUser',
    LIST_USERS = '[User] ListUsers',
    RESET_USERS = '[User] ResetUsers',
    ADD_USERS = '[User] AddUsers',
    ADD_USER = '[User] AddUser',
    ALTER_USER = '[User] AlterUser',
    REMOVE_USER = '[User] RemoveUser'
}

export class CreateUser implements Action {
    public readonly type = UserActionsEnum.CREATE_USER;
    constructor(public payload: User) { }
}

export class UpdateUser implements Action {
    public readonly type = UserActionsEnum.UPDATE_USER;
    constructor(public payload: User) { }
}

export class DeleteUser implements Action {
    public readonly type = UserActionsEnum.DELETE_USER;
    constructor(public payload: number) { }
}

export class ListUsers implements Action {
    public readonly type = UserActionsEnum.LIST_USERS;
    constructor(public payload: Pagination) { }
}

export class AddUsers implements Action {
    public readonly type = UserActionsEnum.ADD_USERS;
    constructor(public payload: Page) { }
}

export class ResetUsers implements Action {
    public readonly type = UserActionsEnum.RESET_USERS;
}

export class AddUser implements Action {
    public readonly type = UserActionsEnum.ADD_USER;
    constructor(public payload: User) { }
}

export class AlterUser implements Action {
    public readonly type = UserActionsEnum.ALTER_USER;
    constructor(public payload: User) { }
}

export class RemoveUser implements Action {
    public readonly type = UserActionsEnum.REMOVE_USER;
    constructor(public payload: number) { }
}

export type UserActions = CreateUser |
    UpdateUser |
    DeleteUser |
    ListUsers |
    ResetUsers |
    AddUsers |
    AddUser |
    AlterUser |
    RemoveUser;