import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/shared/model/user.model';
import { USerService } from 'src/app/shared/services/user.service';

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
		public router: Router,
		public userService: USerService
	) {
		this.translate.addLangs(['en', 'fr', 'es', 'pt']);
		this.translate.setDefaultLang('pt');
		const browserLang = this.translate.getBrowserLang();
		this.translate.use(
			browserLang.match(/en|fr|es|pt/) ? browserLang : 'pt'
		);
		this.userService = userService;

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
		this.userService.current().subscribe(
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
		localStorage.removeItem('token');
	}

	changeLang(language: string) {
		this.translate.use(language);
	}
}
