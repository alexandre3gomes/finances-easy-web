import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppState } from './store/app.reducers';
import { auth } from './store/app.selectors';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

	constructor(private http: HttpClient, private store: Store<AppState>) {
	}

	ngOnInit () {
		this.http.get(environment.api.concat('public/logon/test'), { responseType: 'text' }).subscribe(); // Wake up dyno
		if(!environment.production) {
			this.store.select(auth).subscribe((authState) => {
				localStorage.setItem('token', authState.loggedUser.token);
			});
		}
	}
}
