import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
	ShowAlertSuccess,
	HideAlert,
	AlertActionsEnum
} from '../actions/alert.actions';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class AlertEffects {
	constructor(private action: Actions) {}

	@Effect()
	showAlert$ = this.action.pipe(
		ofType<ShowAlertSuccess>(AlertActionsEnum.ShowAlertSucess),
		mapTo(setTimeout(() => new HideAlert(), 1000))
	);
}
