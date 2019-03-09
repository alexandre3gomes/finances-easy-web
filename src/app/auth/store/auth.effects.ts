import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/model/user.model';
import { environment } from 'src/environments/environment';
import { ShowAlertError } from '../../store/alert.actions';
import * as AuthActions from './auth.actions';
import { AuthActionsEnum } from './auth.actions';


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
			return this.http.post<User>(this.logonEndpoint.concat('/login'), user).pipe(
				take(1),
				map((us: User) => {
					localStorage.setItem('token', us.token);
					return {
						type: AuthActionsEnum.SET_AUTHENTICATED,
						payload: us
					};
				}),
				catchError(() => {
					return of(new ShowAlertError('Login failed, try again'));
				})
			);
		})
	);

	@Effect({ dispatch: false })
	authLogout = this.actions.pipe(
		ofType(AuthActionsEnum.LOGOUT),
		switchMap(() => {
			return this.http.get<void>(this.userEndpoint.concat('/logout')).pipe(
				tap(() => {
					localStorage.removeItem('token');
					this.router.navigate([ '/login' ]);
				}),
				catchError((err) => {
					return of(console.log(err));
				})
			);
		})
	);

	@Effect({ dispatch: false })
	authSetToken = this.actions.pipe(
		ofType(AuthActionsEnum.SET_AUTHENTICATED),
		tap(() => {
			this.router.navigate([ '/dashboard' ]);
		})
	);
}
