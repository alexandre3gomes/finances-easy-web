import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Default } from '../../../shared/enum/default.enum';
import { ShowAlertError } from '../../../store/alert.actions';
import * as UserActions from './user.actions';
import { UserActionsEnum } from './user.actions';

@Injectable()
export class UserEffects {
    private userEndPoint = environment.api.concat('user');

    constructor(private actions: Actions, private http: HttpClient) {
    }

    @Effect()
    listUsers = this.actions.pipe(
        ofType(UserActionsEnum.LIST_USERS),
        switchMap((action: UserActions.ListUsers) => this.http.get(this.userEndPoint, {
                params: new HttpParams().set('page', action.payload.page ? action.payload.page.toString() : Default.START_PAGE.toString())
                    .set('size', action.payload.size ? action.payload.size.toString() : Default.PAGE_SIZE.toString())
            }).pipe(
                map((page: any) => ({
                        type: UserActionsEnum.ADD_USERS,
                        payload: page
                    })),
                catchError((err) => {
                    console.error(err);
                    return of(new ShowAlertError('Error on list users'));
                })
            )),
    );
}
