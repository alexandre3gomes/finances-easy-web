import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoadCurrentUser } from '../auth/store/auth.actions';
import { AppState } from '../store/app.reducers';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

	collapedSideBar: boolean;

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.store.dispatch(new LoadCurrentUser());
	}

	receiveCollapsed($event) {
		this.collapedSideBar = $event;
	}
}
