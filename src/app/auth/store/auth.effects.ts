import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { User } from 'src/app/shared/model/user.model';
import { environment } from 'src/environments/environment';
import { ShowAlertError } from '../../store/alert.actions';
import { AuthActionsEnum } from './auth.actions';

@Injectable()
export class AuthEffects {
    private userEndpoint = environment.api.concat('user');

    constructor(private actions: Actions, private http: HttpClient) { }

    @Effect()
    authLogon = this.actions.pipe(
        ofType(AuthActionsEnum.GET_CURRENT_USER),
        switchMap((user: User) => this.http.get(this.userEndpoint.concat('/current')).pipe(
                map((us: User) => ({
                        type: AuthActionsEnum.SET_LOGGED_USER,
                        payload: us
                    })),
                catchError((err) => of(new ShowAlertError(`Get current user failed, try again. Reason: ${err}`)))
            ))
    );
}
