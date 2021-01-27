import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ShowAlertError} from '../../store/alert.actions';
import {AppState} from '../../store/app.reducers';
import {OktaAuthService} from '@okta/okta-angular';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
	constructor(private router: Router,
				private store: Store<AppState>,
				private ngxService: NgxUiLoaderService,
				private oktaAuth: OktaAuthService
	) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.ngxService.start();
		const token = this.oktaAuth.getAccessToken();
		const modified = req.clone({setHeaders: {'Authorization': 'Bearer ' + token}});
		return next.handle(modified).pipe(
			map((event: HttpHeaderResponse) => {
				if (event.status === 200) {
					this.ngxService.stop();
				}
				return event;
			}),
			catchError((error: HttpErrorResponse) => {
				if (error.status === 409) {
					this.store.dispatch(new ShowAlertError('There is relationed data'));
					this.ngxService.stop();
				} else {
					this.router.navigate(['/login']);
					this.ngxService.stop();
					return throwError(error);
				}
			})
		);
	}
}
