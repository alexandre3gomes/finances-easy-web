import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { authLoggedUser } from '../../../auth/store/auth.selectors';
import { Category } from '../../../shared/model/category.model';
import { Expense } from '../../../shared/model/expense.model';
import { Income } from '../../../shared/model/income.model';
import { Savings } from '../../../shared/model/savings.model';
import { User } from '../../../shared/model/user.model';
import { AppState } from '../../../store/app.reducers';
import { category } from '../../../store/app.selectors';
import { categories } from '../../category/store/category.selectors';
import { CreateExpense } from '../../expense/store/expense.actions';
import { CreateIncome } from '../../income/store/income.actions';
import { CreateSavings, UpdateSavings } from '../store/savings.actions';
import { savings } from '../store/savings.selectors';

@Component({
	selector: 'app-edit-savings',
	templateUrl: './edit-savings.component.html'
})
export class EditSavingsComponent implements OnInit {

	modalVisible = false;
	savingsForm: FormGroup;
	categories: Category[];
	isEdit: boolean = false;
	selectedCat: number;
	IN = 'in'
	@Input() currentId: number;
	@Output() closed = new EventEmitter<void>();

	constructor(private store: Store<AppState>, private translate: TranslateService) { }

	ngOnInit() {
		this.store.select(categories).subscribe((categories: Category[]) => {
			this.categories = categories.filter(cat => cat.savings);
		});
		this.initForm();
	}

	ngOnDestroy() {
		this.currentId = -1;
		this.isEdit = false;
	}

	saveChanges() {
		const createdDate = this.savingsForm.get('createdDate').value;
		if (typeof createdDate.setHours === 'function') {
			createdDate.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
		}
		if (this.currentId > 0) {
			this.updateSavings(createdDate);
		} else {
			this.createSavings(createdDate);
		}

		this.closed.emit();
	}

	private createSavings(createdDate: any) {
		let loggedUser: User;
		this.store.select(authLoggedUser).subscribe((user: User) => {
			loggedUser = user;
		});
		let value = +this.savingsForm.get('value').value;
		if(this.savingsForm.get('operation').value === this.IN) {
			const category = this.categories.filter(cat => cat.id === +this.savingsForm.get('category').value);
			this.store.dispatch(new CreateExpense(new Expense(-1, this.savingsForm.get('description').value, category[0], loggedUser, this.savingsForm.get('value').value, createdDate, this.translate.instant('Automatically created by savings'))));
		} else {
			value *= -1;
			this.store.dispatch(new CreateIncome(new Income(-1, loggedUser, this.savingsForm.get('description').value, this.savingsForm.get('value').value, createdDate, this.translate.instant('Automatically created by savings'))));
		}
		this.store.dispatch(new CreateSavings(new Savings(-1, loggedUser, this.savingsForm.get('description').value, value, createdDate)));
	}

	private updateSavings(createdDate: any) {
		let editedSavings: Savings;
		this.store.select(savings).subscribe((savingsState: Savings[]) => {
			editedSavings = savingsState.find((sav: Savings) => sav.id === this.currentId);
		});
		if (editedSavings) {
			editedSavings.description = this.savingsForm.get('description').value;
			editedSavings.value = this.savingsForm.get('value').value;
			editedSavings.createdDate = createdDate;
			this.store.dispatch(new UpdateSavings(editedSavings));
		}
		return editedSavings;
	}

	initForm() {
		let description = '';
		let value;
		let createdDate = new Date();
		if (this.currentId > 0) {
			this.isEdit = true;
			this.store.select(savings).subscribe((savs: Savings[]) => {
				const savings = savs.find((sav: Savings) => sav.id === this.currentId);
				if (savings) {
					description = savings.description;
					value = savings.value;
					createdDate = savings.createdDate;
				}
			});
		}
		this.selectedCat = this.categories && this.categories.length > 0 ? this.categories[0].id : -1;
		this.savingsForm = new FormGroup({
			'description': new FormControl(description, Validators.required),
			'value': new FormControl(value, Validators.min(0.1)),
			'createdDate': new FormControl(createdDate, Validators.required),
			'operation': new FormControl('in'),
			'category': new FormControl(this.selectedCat),
		});
	}

	closeModal() {
		this.closed.emit();
	}

}
