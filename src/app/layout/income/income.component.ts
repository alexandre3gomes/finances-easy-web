import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authLoggedUser } from '../../auth/store/auth.selectors';
import { Income } from '../../shared/model/income.model';
import { User } from '../../shared/model/user.model';
import { AppState } from '../../store/app.reducers';
import { CreateIncome, DeleteIncome, ListIncomes, UpdateIncome } from './store/income.actions';
import { IncomeState } from './store/income.reducers';




@Component({
	selector: 'app-income',
	templateUrl: './income.component.html'
})
export class IncomeComponent implements OnInit, OnDestroy {
	incomeState = this.store.select('income');
	editMode = false;
	modalVisible = false;
	incomeForm: FormGroup;
	currentId: number;
	showConfirm = false;
	DATE_FORMAT = 'yyyy-MM-ddThh:mm';

	constructor(private store: Store<AppState>) { }

	ngOnInit () {
		this.initForm();
		this.store.dispatch(new ListIncomes());
	}

	ngOnDestroy () {
		this.resetModal();
	}

	openModal () {
		this.modalVisible = true;
	}

	resetModal () {
		this.modalVisible = false;
		this.editMode = false;
		this.showConfirm = false;
		this.currentId = -1;
		this.initForm();
	}

	saveChanges () {
		if (this.editMode) {
			this.store.select('income').subscribe((incomeState: IncomeState) => {
				const editedIncome = incomeState.incomes.find((inc: Income) => inc.id === this.currentId);
				editedIncome.name = this.incomeForm.get('name').value;
				editedIncome.value = this.incomeForm.get('value').value;
				editedIncome.date = this.incomeForm.get('createdDate').value;
				this.store.dispatch(new UpdateIncome(editedIncome));
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
		this.resetModal();
	}

	initForm () {
		let name = '';
		let value = 0;
		const dp = new DatePipe('en-en');
		let createdDate = dp.transform(new Date(), this.DATE_FORMAT);
		if (this.editMode) {
			this.incomeState.subscribe((incomeState: IncomeState) => {
				name = incomeState.incomes.find((inc: Income) => inc.id === this.currentId).name;
				value = incomeState.incomes.find((inc: Income) => inc.id === this.currentId).value;
				createdDate = dp.transform(incomeState.incomes.find((inc: Income) => inc.id === this.currentId).date, this.DATE_FORMAT);
			});
		}
		this.incomeForm = new FormGroup({
			'name': new FormControl(name, Validators.required),
			'value': new FormControl(value, Validators.min(1)),
			'createdDate': new FormControl(createdDate, Validators.required)
		});
	}

	editIncome (id: number) {
		this.currentId = id;
		this.editMode = true;
		this.initForm();
		this.openModal();
	}

	deleteIncome (id: number) {
		this.currentId = id;
		this.showConfirm = true;
	}

	confirmDelete (confirm: boolean) {
		if (confirm) {
			this.store.dispatch(new DeleteIncome(this.currentId));
		}
		this.resetModal();
	}

}
