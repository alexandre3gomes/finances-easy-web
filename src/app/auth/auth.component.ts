import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { routerTransition } from '../router.animations';
import { User } from '../shared/model/user.model';
import { ShowAlertError } from '../store/alert.actions';
import { AppState } from '../store/app.reducers';
import { Logon } from './store/auth.actions';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	animations: [routerTransition()]
})
export class AuthComponent implements OnInit {
	username = new FormControl();
	password = new FormControl();
	loginFail = false;
	failedAnim = false;

	constructor(
		private translate$: TranslateService,
		private store: Store<AppState>
	) {
		this.translate$.addLangs(['en', 'fr', 'es', 'pt']);
		this.translate$.setDefaultLang('en');
		const browserLang = this.translate$.getBrowserLang();
		this.translate$.use(
			browserLang.match(/en|fr|es|pt/) ? browserLang : 'pt'
		);
	}

	ngOnInit() { }

	login() {
		if (this.username.valid && this.password.valid) {
			const user = new User(-1, '', this.username.value, this.password.value, '');
			this.store.dispatch(new Logon(user));
		} else {
			this.store.dispatch(new ShowAlertError('Login failed, try again'));
		}
	}
}
