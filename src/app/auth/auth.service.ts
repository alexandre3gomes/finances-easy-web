import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../shared/model/user.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private logonEndpoint = environment.api.concat('public/logon');

	constructor(private http: HttpClient) { }

	public logon(user: User): Observable<string> {
		const params = new HttpParams()
			.set('username', user.username)
			.set('password', user.password);
		return this.http.post(this.logonEndpoint.concat('/login'), user, {
			responseType: 'text'
		});
	}
}
