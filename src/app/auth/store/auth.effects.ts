import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/model/user.model';
import { environment } from 'src/environments/environment';
import { ShowAlertError } from '../../store/alert.actions';
import { AppActionsEnum } from '../../store/app.actions';
import * as AuthActions from './auth.actions';
import { AuthActionsEnum } from './auth.actions';


@Injectable()
export class AuthEffects {

	private userEndpoint = environment.api.concat('user');

	constructor(private actions: Actions, private http: HttpClient, private router: Router) { }

	@Effect()
	authLogon = this.actions.pipe(
		ofType(AuthActionsEnum.SET_LOGGED_USER),
		map((action: AuthActions.SetLoggerUser) => {
			return action.payload;
		}),
		switchMap((user: User) => {
			return this.http.post<User>(this.userEndpoint.concat('/current'), user).pipe(
				take(1),
				map((us: User) => {
					return {
						type: AuthActionsEnum.SET_LOGGED_USER,
						payload: us
					};
				}),
				catchError((err) => {
					console.error(err);
					return of(new ShowAlertError('Get current user failed, try again'));
				})
			);
		})
	);

}
