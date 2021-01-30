import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { ShowAlertError } from '../store/alert.actions';
import { AppState } from '../store/app.reducers';
import { OktaAuthService } from '@okta/okta-angular';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: [ './auth.component.scss' ],
    animations: [ routerTransition() ]
})
export class AuthComponent {
    username = new FormControl();
    password = new FormControl();
    loginFail = false;

    constructor(private translate$: TranslateService, private store: Store<AppState>, private oktaAuth: OktaAuthService) {
        this.translate$.addLangs([ 'en', 'fr', 'es', 'pt' ]);
        this.translate$.setDefaultLang('pt');
        const browserLang = this.translate$.getBrowserLang();
        this.translate$.use(
            browserLang.match(/en|fr|es|pt/) ? browserLang : 'pt'
        );
    }

    login() {
        if (this.username.valid && this.password.valid) {
            this.oktaAuth.signInWithCredentials({password: this.password.value, username: this.username.value})
                .then(transaction => {
                    if (transaction.status === 'SUCCESS') {
                        this.oktaAuth.token.getWithRedirect({
                            sessionToken: transaction.sessionToken,
                            responseType: 'id_token'
                        });
                    }
                }).catch(err => this.store.dispatch(new ShowAlertError(`Login failed. Reason: ${err}`)));
        } else {
            this.store.dispatch(new ShowAlertError('Login failed, try again'));
        }
    }
}
