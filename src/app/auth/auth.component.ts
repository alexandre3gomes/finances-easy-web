import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { routerTransition } from '../router.animations';
import { ShowAlertError } from '../store/alert.actions';
import { AppState } from '../store/app.reducers';

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

    constructor(private translate$: TranslateService,
                private store: Store<AppState>,
                @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,
                private router: Router) {
        this.translate$.addLangs(['en', 'fr', 'es', 'pt']);
        this.translate$.setDefaultLang('pt');
        const browserLang = this.translate$.getBrowserLang();
        this.translate$.use(
            browserLang.match(/en|fr|es|pt/) ? browserLang : 'pt'
        );
    }

    ngOnInit() {
        setTimeout(() => this.router.navigate(['/dashboard']),
        2000);
    }

    login() {
        if (this.username.valid && this.password.valid) {
            this._oktaAuth.signInWithCredentials({ password: this.password.value, username: this.username.value })
                .then((transaction) => {
                    if (transaction.status === 'SUCCESS') {
                        this._oktaAuth.token.getWithRedirect({
                            sessionToken: transaction.sessionToken,
                            responseType: 'id_token'
                        });
                    }
                }).catch((err) => this.store.dispatch(new ShowAlertError(`Login failed. Reason: ${err}`)));
        } else {
            this.store.dispatch(new ShowAlertError('Login failed, try again'));
        }
    }
}
