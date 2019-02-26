import { OnInit, Component } from '@angular/core';
import { Income } from 'src/app/shared/model/income.model';
import { User } from 'src/app/shared/model/user.model';
import { USerService } from 'src/app/shared/services/user.service';
import { IncomeService } from './income.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { ShowAlertSuccess, ShowAlertError } from 'src/app/store/actions/alert.actions';

@Component({
	selector: 'app-income',
	templateUrl: './income.component.html'
})
export class IncomeComponent implements OnInit {
	income = new Income(undefined, undefined, '', 0);
	editMode = false;
	modalStyle = 'none';

	constructor(
		private userServ: USerService,
		private incService: IncomeService,
		private alertState: Store<AppState>
	) {}

	ngOnInit() {
		this.userServ
			.current()
			.subscribe((us: User) => (this.income.user = us));
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
				this.alertState.dispatch(new ShowAlertSuccess('Saved'));
			},
			error => {
				console.log(error);
				this.alertState.dispatch(new ShowAlertError('Error'));
			}
		);
		this.closeModal();
	}
}
