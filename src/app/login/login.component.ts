import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { LoginService } from './login.service';
import { User } from '../shared/model/user.model';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
	username = new FormControl();
	password = new FormControl();
	loginFail = false;
	failedAnim = false;

	constructor(
		private translate: TranslateService,
		public router: Router,
		public loginServ: LoginService
	) {
		this.translate.addLangs(['en', 'fr', 'es', 'pt']);
		this.translate.setDefaultLang('en');
		const browserLang = this.translate.getBrowserLang();
		this.translate.use(
			browserLang.match(/en|fr|es|pt/) ? browserLang : 'pt'
		);
		this.loginServ = loginServ;
	}

	ngOnInit() {}

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
			localStorage.setItem('token', data);
			this.router.navigate(['/dashboard']);
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
