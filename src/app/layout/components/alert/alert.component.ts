import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { GetAlert, HideAlert } from 'src/app/store/actions/alert.actions';
import { msgAlert, visibleAlert, errorAlert } from 'src/app/store/selectors/alert.selectors';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
	error = this.store.pipe(select(errorAlert));
	msg = this.store.pipe(select(msgAlert));
	visible = this.store.pipe(select(visibleAlert));

	constructor(private store: Store<AppState>) {}

	ngOnInit() {
		this.store.dispatch(new GetAlert());
	}

	hideAlert() {
		this.store.dispatch(new HideAlert());
	}
}
