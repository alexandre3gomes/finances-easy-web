import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.reducers';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
	constructor(private store: Store<AppState>) { }

	intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage.getItem('token');
		const modified = req.clone({ setHeaders: { 'Authorization': 'Bearer ' + token } });
		return next.handle(modified);
	}
}
