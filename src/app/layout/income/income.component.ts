import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authLoggedUser } from 'src/app/auth/store/auth.selectors';
import { Income } from 'src/app/shared/model/income.model';
import { User } from 'src/app/shared/model/user.model';
import { ShowAlertError, ShowAlertSuccess } from '../../store/alert.actions';

import { AppState } from '../../store/app.reducers';
import { IncomeService } from './income.service';

@Component({
	selector: 'app-income',
	templateUrl: './income.component.html'
})
export class IncomeComponent implements OnInit {
	income = this.getNewIncome();
	editMode = false;
	modalStyle = 'none';

	constructor(
		private incService: IncomeService,
		private store: Store<AppState>
	) { }

	ngOnInit() {
		this.store.select(authLoggedUser).subscribe((user: User) => {
			this.income.user = user;
		});
	}

	openModal() {
		this.editMode = true;
		this.modalStyle = 'block';
	}

	closeModal() {
		this.editMode = false;
		this.modalStyle = 'none';
	}

	saveChanges() {
		this.incService.create(this.income).subscribe(
			inc => {
				this.income = inc;
				this.store.dispatch(new ShowAlertSuccess('Saved'));
				this.closeModal();
				this.income = this.getNewIncome();
			},
			error => {
				this.store.dispatch(new ShowAlertError('Error'));
			}
		);
	}

	getNewIncome() {
		return new Income(undefined, undefined, '', 0);
	}
}
