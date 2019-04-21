import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

	constructor(private http: HttpClient) {
	}

	ngOnInit () {
		this.http.get(environment.api.concat('public/logon/test'), { responseType: 'text' }).subscribe(); // Wake up dyno
	}
}
