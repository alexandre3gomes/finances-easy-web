import { Component, OnInit } from '@angular/core';
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
export class IncomeComponent implements OnInit {
	incomeState = this.store.select('income');
	editMode = false;
	modalVisible = false;
	incomeForm: FormGroup;
	currentId: number;
	showConfirm = false;

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.initForm();
		this.store.dispatch(new ListIncomes());
	}

	openModal() {
		this.modalVisible = true;
	}

	closeModal() {
		this.modalVisible = false;
		this.editMode = false;
		this.initForm();
	}

	saveChanges() {
		if (this.editMode) {
			this.store.select('income').subscribe((incomeState: IncomeState) => {
				let editedIncome = incomeState.incomes.find((inc: Income) => inc.id == this.currentId);
				editedIncome.name = this.incomeForm.get('name').value;
				editedIncome.value = this.incomeForm.get('value').value;
				this.store.dispatch(new UpdateIncome(editedIncome));
			});
		} else {
			this.store.select(authLoggedUser).subscribe((user: User) => {
				this.store.dispatch(new CreateIncome(new Income(-1, user, this.incomeForm.get('name').value, this.incomeForm.get('value').value, new Date())));
			});
		}
		this.closeModal();
	}

	initForm() {
		let name = '';
		let value = 0;
		if (this.editMode) {
			this.incomeState.subscribe((incomeState: IncomeState) => {
				name = incomeState.incomes.find((inc: Income) => inc.id == this.currentId).name;
				value = incomeState.incomes.find((inc: Income) => inc.id == this.currentId).value;
			});
		}
		this.incomeForm = new FormGroup({
			'name': new FormControl(name, Validators.required),
			'value': new FormControl(value, Validators.min(1))
		});
	}

	editIncome(id: number) {
		this.currentId = id;
		this.editMode = true;
		this.initForm();
		this.openModal();
	}

	deleteIncome(id: number) {
		this.currentId = id;
		this.showConfirm = true;
	}

	confirmDelete(confirm: boolean) {
		if (confirm) {
			this.store.dispatch(new DeleteIncome(this.currentId));
		}
		this.showConfirm = false;
		this.currentId = -1;
	}

}
