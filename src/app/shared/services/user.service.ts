import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../model/user.model';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	public loggedUser = new Subject<User>();
	private userEndpoint = environment.api.concat('user');

	constructor(private http: HttpClient) { }

	public loadCurrentUser() {
		this.http.get<User>(this.userEndpoint.concat('/current')).subscribe((user: User) => {
			this.loggedUser.next(user);
		});
	}
}
