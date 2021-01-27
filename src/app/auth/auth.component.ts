import {Component, OnInit} from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';
import {Router} from '@angular/router';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

	constructor(private oktaAuth: OktaAuthService, private router: Router) {
	}

	ngOnInit () {
		this.oktaAuth.signInWithRedirect().then(_ => this.router.navigate(['/']));
	}

}
