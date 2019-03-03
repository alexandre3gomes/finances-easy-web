import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../store/app.reducers';
import { GetAlert, HideAlert } from '../../store/alert.actions';
import { errorAlert, msgAlert, visibleAlert } from '../../store/alert.selectors';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
	error = this.store.select(errorAlert);
	msg = this.store.select(msgAlert);
	visible = this.store.select(visibleAlert);

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.store.dispatch(new GetAlert());
	}

	hideAlert() {
		this.store.dispatch(new HideAlert());
	}
}
