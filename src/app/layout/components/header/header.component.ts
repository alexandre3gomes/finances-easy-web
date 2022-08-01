import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AppState } from '../../../store/app.reducers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;

    public userLogged: string;

    constructor(
        private translate: TranslateService,
        private router: Router,
        private store: Store<AppState>,
        @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth
    ) {
        this.translate.addLangs(['en', 'pt']);
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(
            browserLang.match(/en|pt/) ? browserLang : 'pt'
        );
        this.router.events.subscribe((val) => {
            if (
                val instanceof NavigationEnd
                && window.innerWidth <= 992
                && this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    async ngOnInit () {
        this.pushRightClass = 'push-right';
        const claims = this._oktaAuth.getUser()
        this.userLogged = (await claims).name;
    }

    isToggled (): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar () {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }ghe

    rltAndLtr () {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout () {
        // TODO
    }

    changeLang (language: string) {
        this.translate.use(language);
    }
}
