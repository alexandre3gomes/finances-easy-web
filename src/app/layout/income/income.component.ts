import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Income } from 'src/app/shared/model/income.model';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ShowAlertError, ShowAlertSuccess } from 'src/app/store/actions/alert.actions';
import { AppState } from 'src/app/store/state/app.state';
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
		private userServ: UserService,
		private incService: IncomeService,
		private store: Store<AppState>
	) { }

	ngOnInit() {
		this.userServ.current().subscribe((us: User) => (this.income.user = us));
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
