import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { OktaAuthService } from '@okta/okta-angular';
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
        private oktaAuth: OktaAuthService
    ) {
        this.translate.addLangs(['en', 'pt']);
        this.translate.setDefaultLang('pt');
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
        const claims = await this.oktaAuth.getUser();
        this.userLogged = claims.name;
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

    onLoggedout () {
        // TODO
    }

    changeLang (language: string) {
        this.translate.use(language);
    }
}
