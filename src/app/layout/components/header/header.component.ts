import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { Logoff } from '../../../auth/store/auth.actions';
import { User } from '../../../shared/model/user.model';
import { UserService } from '../../../shared/services/user.service';
import { AppState } from '../../../store/app.reducers';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public pushRightClass: string;
	public user: User;

	constructor(
		private translate: TranslateService,
		private router: Router,
		private userService: UserService,
		private store: Store<AppState>
	) {
		this.translate.addLangs(['en', 'fr', 'es', 'pt']);
		this.translate.setDefaultLang('pt');
		const browserLang = this.translate.getBrowserLang();
		this.translate.use(
			browserLang.match(/en|fr|es|pt/) ? browserLang : 'pt'
		);
		this.router.events.subscribe(val => {
			if (
				val instanceof NavigationEnd &&
				window.innerWidth <= 992 &&
				this.isToggled()
			) {
				this.toggleSidebar();
			}
		});
	}

	ngOnInit() {
		this.pushRightClass = 'push-right';
		this.userService.loggedUser.subscribe(
			(data: User) => {
				this.user = data;
			},
			error => {
				localStorage.removeItem('token');
				this.router.navigate(['/login']);
			}
		);
	}

	isToggled(): boolean {
		const dom: Element = document.querySelector('body');
		return dom.classList.contains(this.pushRightClass);
	}

	toggleSidebar() {
		const dom: any = document.querySelector('body');
		dom.classList.toggle(this.pushRightClass);
	}

	rltAndLtr() {
		const dom: any = document.querySelector('body');
		dom.classList.toggle('rtl');
	}

	onLoggedout() {
		this.store.dispatch(new Logoff());
		this.userService.loggedUser.next(null);
	}

	changeLang(language: string) {
		this.translate.use(language);
	}
}
