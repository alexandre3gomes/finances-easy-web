import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
	constructor(private router: Router) { }

	intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage.getItem('token');
		const modified = req.clone({ setHeaders: { 'Authorization': 'Bearer ' + token } });
		return next.handle(modified).pipe(
			map((event: HttpEvent<any>) => {
				return event;
			}),
			catchError((error: HttpErrorResponse) => {
				this.router.navigate([ '/login' ]);
				return throwError(error);
			})
		);
	}
}
