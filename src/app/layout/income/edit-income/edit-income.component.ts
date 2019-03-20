import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class EditIncomeComponent implements OnInit {

	@Input() state;
	modalVisible = false;
	incomeForm: FormGroup;
	DATE_FORMAT = 'yyyy-MM-ddThh:mm';
	@Input() currentId: number;
	@Output() closed = new EventEmitter<boolean>();

	constructor(private store: Store<AppState>) { }

	ngOnInit () {
		this.initForm();
	}

	saveChanges () {
		if (this.currentId > 0) {
			this.store.select('income').subscribe((incomeState: IncomeState) => {
				const editedIncome = incomeState.incomes.find((inc: Income) => inc.id === this.currentId);
				if (editedIncome) {
					editedIncome.name = this.incomeForm.get('name').value;
					editedIncome.value = this.incomeForm.get('value').value;
					editedIncome.date = this.incomeForm.get('createdDate').value;
					this.store.dispatch(new UpdateIncome(editedIncome));
				}
			});
		} else {
			this.store.select(authLoggedUser).subscribe((user: User) => {
				this.store.dispatch(
					new CreateIncome(new Income(-1,
						user,
						this.incomeForm.get('name').value,
						this.incomeForm.get('value').value,
						this.incomeForm.get('createdDate').value)));
			});
		}
		this.closeModal();
	}

	initForm () {
		let name = '';
		let value = 0;
		const dp = new DatePipe('en-en');
		let createdDate = dp.transform(new Date(), this.DATE_FORMAT);
		if (this.currentId > 0) {
			this.state.subscribe((incomeState: IncomeState) => {
				const income = incomeState.incomes.find((inc: Income) => inc.id === this.currentId);
				if (income) {
					name = income.name;
					value = income.value;
					createdDate = dp.transform(income.date, this.DATE_FORMAT);
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
		this.closed.emit();
	}

}
