import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { routerTransition } from '../router.animations';
import { User } from '../shared/model/user.model';
import { UserService } from '../shared/services/user.service';
import { AppState } from '../store/app.reducers';
import { AuthService } from './auth.service';
import { Logon } from './store/auth.actions';

@Component({
	selector: 'app-login',
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
		private router$: Router,
		private loginServ: AuthService,
		private userServ: UserService,
		private store: Store<AppState>
	) {
		this.translate$.addLangs(['en', 'fr', 'es', 'pt']);
		this.translate$.setDefaultLang('en');
		const browserLang = this.translate$.getBrowserLang();
		this.translate$.use(
			browserLang.match(/en|fr|es|pt/) ? browserLang : 'pt'
		);
		this.loginServ = loginServ;
	}

	ngOnInit() { }

	login() {
		const user = new User(
			-1,
			'',
			this.username.value,
			this.password.value,
			''
		);
		this.loginServ.logon(user)
			.subscribe(
				data => {
					this.store.dispatch(new Logon(data));
					this.userServ.loadCurrentUser();
					this.router$.navigate(['/dashboard']);
				},
				error => {
					this.loginFail = true;
					this.failedAnim = true;
				}
			);
	}

	hideFailLoginMsg() {
		this.failedAnim = false;
		setTimeout(() => this.loginFail = false, 1000);
	}
}
