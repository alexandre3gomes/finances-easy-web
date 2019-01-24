import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class USerService {
	userEndpoint = environment.api.concat('user');
	constructor(private http: HttpClient) {}
	public current(): Observable<User> {
		return this.http.get<User>(this.userEndpoint.concat('/current'));
	}
}
