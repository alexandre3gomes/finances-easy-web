import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authAuthenticated } from '../../auth/store/auth.selectors';
import { AppState } from '../../store/app.reducers';


@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private store: Store<AppState>) { }

	canActivate () {
		let authenticated: boolean;
		this.store.select(authAuthenticated).subscribe(authenticatedStore => authenticated = authenticatedStore);
		if (authenticated) {
			return true;
		}
		this.router.navigate([ '/login' ]);
		return false;
	}
}
