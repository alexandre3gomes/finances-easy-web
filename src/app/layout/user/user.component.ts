import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Default } from '../../shared/enum/default.enum';
import { Pagination } from '../../shared/model/pagination/pagination.model';
import { AppState } from '../../store/app.reducers';
import { user } from '../../store/app.selectors';
import { DeleteUser, ListUsers, ResetUsers } from './store/user.actions';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {

	state = this.store.select(user);
	editModal = false;
	userForm: FormGroup;
	currentId: number;
	showConfirm = false;
	currentPage = 0;
	DATE_FORMAT = 'L';

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.store.dispatch(new ListUsers(new Pagination(this.currentPage, Default.PAGE_SIZE)));
	}

	ngOnDestroy() {
		this.resetData();
		this.store.dispatch(new ResetUsers());
	}

	openModal() {
		this.editModal = true;
	}

	editUser(id: number) {
		this.currentId = id;
		this.openModal();
	}

	deleteUser(id: number) {
		this.currentId = id;
		this.showConfirm = true;
	}

	confirmDelete(confirm: boolean) {
		if (confirm) {
			this.store.dispatch(new DeleteUser(this.currentId));
		}
		this.resetData();
	}

	resetData() {
		this.showConfirm = false;
		this.editModal = false;
		this.currentId = -1;
		this.currentPage = 0;
	}

	showMore() {
		this.currentPage++;
		this.store.dispatch(new ListUsers(new Pagination(this.currentPage, Default.PAGE_SIZE)));
	}


}
