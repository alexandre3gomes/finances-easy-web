import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';

import {User} from '../../../shared/model/user.model';
import {AppState} from '../../../store/app.reducers';
import {CreateUser, UpdateUser} from '../store/user.actions';
import {users} from '../store/user.selectors';


@Component({
	selector: 'app-edit-user',
	templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {

	userForm: FormGroup;
	@Input() currentId: number;
	@Output() closed = new EventEmitter<void>();

	constructor(private store: Store<AppState>) {
	}

	ngOnInit() {
		this.initForm();
	}

	saveChanges() {
		let editedUser: User;
		if (this.currentId > 0) {
			this.store.select(users).subscribe((userState: User[]) => {
				editedUser = userState.find((inc: User) => inc.id === this.currentId);
			});
			if (editedUser) {
				editedUser.name = this.userForm.get('name').value;
				editedUser.username = this.userForm.get('username').value;
				this.store.dispatch(new UpdateUser(editedUser));
			}
			this.closed.emit();
		} else {
			this.store.dispatch(
				new CreateUser(new User(-1,
					this.userForm.get('name').value,
					this.userForm.get('username').value)));
			this.closed.emit();
		}
	}

	initForm() {
		let name = '';
		let username = '';
		if (this.currentId > 0) {
			this.store.select(users).subscribe((usrs: User[]) => {
				const user = usrs.find((usr: User) => usr.id === this.currentId);
				if (user) {
					name = user.name;
					username = user.username;
				}
			});
		}
		this.userForm = new FormGroup({
			'name': new FormControl(name, Validators.required),
			'username': new FormControl(username, Validators.required)
		});
	}

	closeModal() {
		this.closed.emit();
	}
}
