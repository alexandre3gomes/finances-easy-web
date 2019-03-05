import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/model/user.model';
import { environment } from 'src/environments/environment';

import * as AuthActions from './auth.actions';
import { AuthActionsEnum } from './auth.actions';
import { ShowAlertError } from '../../store/alert.actions';

@Injectable()
export class AuthEffects {

	private logonEndpoint = environment.api.concat('public/logon');
	private userEndpoint = environment.api.concat('user');

	constructor(private actions: Actions, private http: HttpClient, private router: Router) { }

	@Effect()
	authLogon = this.actions.pipe(
		ofType(AuthActionsEnum.LOGON),
		map((action: AuthActions.Logon) => {
			return action.payload;
		}),
		switchMap((user: User) => {
			return this.http.post(this.logonEndpoint.concat('/login'), user, {
				responseType: 'text'
			}).pipe(
				map((token: string) => {
					this.router.navigate(['/dashboard']);
					return {
						type: AuthActionsEnum.SET_TOKEN,
						payload: token
					};
				}),
				catchError(() => {
					return of(new ShowAlertError('Login failed, try again'));
				})
			);
		}),
	);

	@Effect()
	setLoggedUser = this.actions.pipe(
		ofType(AuthActionsEnum.LOAD_CURRENT_USER),
		take(1),
		switchMap(() => {
			return this.http.get<User>(this.userEndpoint.concat('/current')).pipe(
				map((user: User) => {
					return {
						type: AuthActionsEnum.SET_LOGGED_USER,
						payload: user
					};
				}),
				catchError(() => {
					return of({
						type: AuthActionsEnum.LOGOFF
					});
				})
			);
		})
	);

	@Effect({ dispatch: false })
	authLogout = this.actions.pipe(
		ofType(AuthActionsEnum.LOGOFF),
		tap(() => {
			this.router.navigate(['/login']);
		})
	);
}
