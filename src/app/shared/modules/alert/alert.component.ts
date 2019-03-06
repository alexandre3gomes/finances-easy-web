import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetAlert, HideAlert } from 'src/app/store/alert.actions';
import { errorAlert, msgAlert, visibleAlert } from 'src/app/store/alert.selectors';

import { AppState } from '../../../store/app.reducers';


@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
	error = this.store.select(errorAlert);
	msg = this.store.select(msgAlert);
	visible = this.store.select(visibleAlert);

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.store.dispatch(new GetAlert());
		this.visible.subscribe((data) => {
			if (data) {
				setTimeout(() => this.store.dispatch(new HideAlert()), 3000);
			}
		});
	}

	hideAlert() {
		this.store.dispatch(new HideAlert());
	}
}
