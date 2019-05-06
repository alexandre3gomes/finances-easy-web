import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { auth } from '../../store/app.selectors';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(private router: Router, private store: Store<AppState>) { }

	canActivate () {
		let authenticated: boolean;
		this.store.select(auth).subscribe(authStore => {
			authenticated = authStore.authenticated && authStore.loggedUser !== null && authStore.loggedUser.id > 0;
		});
		if (authenticated) {
			return true;
		}
		this.router.navigate([ '/login' ]);
		return false;
	}

	canActivateChild () {
		return this.canActivate();
	}
}
