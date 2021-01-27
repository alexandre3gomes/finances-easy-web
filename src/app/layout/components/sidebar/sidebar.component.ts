import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { authLoggedUser } from 'src/app/auth/store/auth.selectors';
import { User } from 'src/app/shared/model/user.model';
import { AppState } from 'src/app/store/app.reducers';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: [ './sidebar.component.scss' ]
})
export class SidebarComponent implements OnInit {
	isActive: boolean;
	collapsed: boolean;
	showMenu: string;
	pushRightClass: string;
	public userLogged: Observable<User>;

	@Output() collapsedEvent = new EventEmitter<boolean>();

	constructor(private translate: TranslateService, public router: Router, private store: Store<AppState>) {
		this.translate.addLangs([ 'en', 'pt' ]);
		this.translate.setDefaultLang('pt');
		const browserLang = this.translate.getBrowserLang();
		this.translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');

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

	ngOnInit () {
		this.isActive = false;
		this.collapsed = false;
		this.showMenu = '';
		this.pushRightClass = 'push-right';
		this.userLogged = this.store.select(authLoggedUser);
	}


	eventCalled () {
		this.isActive = !this.isActive;
	}

	addExpandClass (element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
	}

	toggleCollapsed () {
		this.collapsed = !this.collapsed;
		this.collapsedEvent.emit(this.collapsed);
	}

	isToggled (): boolean {
		const dom: Element = document.querySelector('body');
		return dom.classList.contains(this.pushRightClass);
	}

	toggleSidebar () {
		const dom: any = document.querySelector('body');
		dom.classList.toggle(this.pushRightClass);
	}

	rltAndLtr () {
		const dom: any = document.querySelector('body');
		dom.classList.toggle('rtl');
	}

	changeLang (language: string) {
		this.translate.use(language);
	}

	onLoggedout () {
		// TODO
	}
}
