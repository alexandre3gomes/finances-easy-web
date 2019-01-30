import { Injectable } from '@angular/core';
import { User } from '../shared/model/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	private logonEndpoint = environment.api.concat('public/logon');

	constructor(private http: HttpClient) {}

	public logon(user: User): Observable<string> {
		const params = new HttpParams()
			.set('username', user.username)
			.set('password', user.password);
		return this.http.post(this.logonEndpoint.concat('/login'), user, {
			responseType: 'text'
		});
	}

	public logout() {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	}
}
