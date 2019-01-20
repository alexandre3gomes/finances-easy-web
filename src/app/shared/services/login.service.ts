import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logonEndpoint = 'public/logon/login';

  constructor(private http: HttpClient) {}

  public logon(user: User) {
    const params = new HttpParams()
      .set('username', user.username)
      .set('password', user.password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token'
    });
    this.http
      .post(environment.api.concat(this.logonEndpoint), user, {
        headers,
        responseType: 'text'
      })
      .subscribe(
        data => {
          localStorage.setItem('token', data);
        },
        error => {
          console.log(error);
        }
      );
  }

  public test() {
    this.http
      .get(environment.api.concat('public/logon/test'))
      .subscribe(data => console.log(data), error => console.log(error));
  }
}
