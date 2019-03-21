import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authLoggedUser } from '../../../auth/store/auth.selectors';
import { Income } from '../../../shared/model/income.model';
import { User } from '../../../shared/model/user.model';
import { AppState } from '../../../store/app.reducers';
import { CreateIncome, UpdateIncome } from '../store/income.actions';
import { IncomeState } from '../store/income.reducers';




@Component({
	selector: 'app-edit-income',
	templateUrl: './edit-income.component.html'
})
export class EditIncomeComponent implements OnInit, OnDestroy {

	@Input() state;
	modalVisible = false;
	incomeForm: FormGroup;
	@Input() currentId: number;
	@Output() closed = new EventEmitter<boolean>();

	constructor(private store: Store<AppState>) { }

	ngOnInit () {
		this.initForm();
	}

	ngOnDestroy () {
		this.currentId = -1;
	}

	saveChanges () {
		const createdDate = this.incomeForm.get('createdDate').value;
		if (this.currentId > 0) {
			this.store.select('income').subscribe((incomeState: IncomeState) => {
				const editedIncome = incomeState.incomes.find((inc: Income) => inc.id === this.currentId);
				if (editedIncome) {
					editedIncome.name = this.incomeForm.get('name').value;
					editedIncome.value = this.incomeForm.get('value').value;
					editedIncome.date = createdDate;
					this.store.dispatch(new UpdateIncome(editedIncome));
				}
			});
			this.closed.emit(false);
		} else {
			this.store.select(authLoggedUser).subscribe((user: User) => {
				this.store.dispatch(
					new CreateIncome(new Income(-1,
						user,
						this.incomeForm.get('name').value,
						this.incomeForm.get('value').value,
						createdDate)));
			});
			this.closed.emit(true);
		}
	}

	initForm () {
		let name = '';
		let value = 0;
		let createdDate = new Date();
		if (this.currentId > 0) {
			this.state.subscribe((incomeState: IncomeState) => {
				const income = incomeState.incomes.find((inc: Income) => inc.id === this.currentId);
				if (income) {
					name = income.name;
					value = income.value;
					createdDate = income.date;
				}
			});
		}
		this.incomeForm = new FormGroup({
			'name': new FormControl(name, Validators.required),
			'value': new FormControl(value, Validators.min(0.1)),
			'createdDate': new FormControl(createdDate, Validators.required)
		});
	}

	closeModal () {
		this.closed.emit(false);
	}

}
