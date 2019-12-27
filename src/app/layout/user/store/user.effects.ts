import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Default } from '../../../shared/enum/default.enum';
import { User } from '../../../shared/model/user.model';
import { AlertActionsEnum, ShowAlertError } from '../../../store/alert.actions';
import * as UserActions from './user.actions';
import { UserActionsEnum } from './user.actions';



@Injectable()
export class UserEffects {

    private userEndPoint = environment.api.concat('user');

    constructor(private actions: Actions, private http: HttpClient) { }

    @Effect()
    createUser = this.actions.pipe(
        ofType(UserActionsEnum.CREATE_USER),
        map((action: UserActions.CreateUser) => {
            return action.payload;
        }),
        switchMap((user: User) => {
            return this.http.post<User>(this.userEndPoint, user).pipe(
                mergeMap((inc: User) => {
                    return [
                        {
                            type: UserActionsEnum.ADD_USER,
                            payload: inc
                        },
                        {
                            type: AlertActionsEnum.SHOW_ALERT_SUCESS,
                            payload: 'User saved'
                        }
                    ];
                }),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on save user'));
                })
            );
        }),
    );

    @Effect()
    updateUser = this.actions.pipe(
        ofType(UserActionsEnum.UPDATE_USER),
        map((action: UserActions.UpdateUser) => {
            return action.payload;
        }),
        switchMap((user: User) => {
            return this.http.post<User>(this.userEndPoint.concat('/update'), user).pipe(
                mergeMap((inc: User) => {
                    return [
                        {
                            type: UserActionsEnum.ALTER_USER,
                            payload: inc
                        },
                        {
                            type: AlertActionsEnum.SHOW_ALERT_SUCESS,
                            payload: 'User edited'
                        }
                    ];
                }),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on edit user'));
                })
            );
        })
    );

    @Effect()
    deleteUser = this.actions.pipe(
        ofType(UserActionsEnum.DELETE_USER),
        map((action: UserActions.DeleteUser) => {
            return action.payload;
        }),
        switchMap((id: number) => {
            return this.http.delete(this.userEndPoint.concat('/').concat(id.toString())).pipe(
                mergeMap(() => {
                    return [
                        {
                            type: UserActionsEnum.REMOVE_USER,
                            payload: id
                        },
                        {
                            type: AlertActionsEnum.SHOW_ALERT_SUCESS,
                            payload: 'User deleted'
                        }
                    ];
                }),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on delete user'));
                })
            );
        }),
    );

    @Effect()
    listUsers = this.actions.pipe(
        ofType(UserActionsEnum.LIST_USERS),
        switchMap((action: UserActions.ListUsers) => {
            return this.http.get(this.userEndPoint, {
                params: new HttpParams().set('page', action.payload.page ? action.payload.page.toString() : Default.START_PAGE.toString())
                    .set('size', action.payload.size ? action.payload.size.toString() : Default.PAGE_SIZE.toString())
            }).pipe(
                map((page: any) => {
                    return {
                        type: UserActionsEnum.ADD_USERS,
                        payload: page
                    };
                }),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on list users'));
                })
            );
        }),
    );

}
