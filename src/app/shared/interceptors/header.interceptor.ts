import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ShowAlertError } from '../../store/alert.actions';
import { AppState } from '../../store/app.reducers';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
	constructor(private router: Router, private store: Store<AppState>) { }

	intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage.getItem('token');
		const modified = req.clone({ setHeaders: { 'Authorization': 'Bearer ' + token } });
		return next.handle(modified).pipe(
			map((event: HttpEvent<any>) => {
				return event;
			}),
			catchError((error: HttpErrorResponse) => {
				if (error.status === 409) {
					this.store.dispatch(new ShowAlertError('There is relationed data'));
				} else {
					this.router.navigate([ '/login' ]);
					return throwError(error);
				}
			})
		);
	}
}
