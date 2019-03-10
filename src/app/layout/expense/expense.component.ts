import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authLoggedUser } from '../../auth/store/auth.selectors';
import { Category } from '../../shared/model/category.model';
import { Expense } from '../../shared/model/expense.model';
import { User } from '../../shared/model/user.model';
import { AppState } from '../../store/app.reducers';
import { ListCategories } from '../category/store/category.actions';
import { CategoryState } from '../category/store/category.reducers';
import { CreateExpense, DeleteExpense, ListExpenses, UpdateExpense } from './store/expense.actions';
import { ExpenseState } from './store/expense.reducers';

@Component({
	selector: 'app-expense',
	templateUrl: './expense.component.html',
	styleUrls: [ './expense.component.scss' ]
})
export class ExpenseComponent implements OnInit, OnDestroy {
	expenseState = this.store.select('expense');
	editMode = false;
	modalVisible = false;
	expenseForm: FormGroup;
	currentId: number;
	showConfirm = false;
	DATE_FORMAT = 'yyyy-MM-ddThh:mm';
	categories: Category[];
	category: Category;

	constructor(private store: Store<AppState>) { }

	ngOnInit () {
		this.store.dispatch(new ListExpenses());
		this.store.select('category').subscribe((categoryState: CategoryState) => {
			if (categoryState.categories.length <= 0) {
				this.store.dispatch(new ListCategories());
			}
			this.categories = categoryState.categories;
		});
		this.initForm();
	}

	ngOnDestroy () {
		this.resetModal();
	}

	openModal () {
		this.category = this.categories[ this.categories.length - 1 ];
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
			this.store.select('expense').subscribe((expenseState: ExpenseState) => {
				const editedExpense = expenseState.expenses.find((exp: Expense) => exp.id === this.currentId);
				editedExpense.name = this.expenseForm.get('name').value;
				editedExpense.value = this.expenseForm.get('value').value;
				editedExpense.category = this.categories.find((cat: Category) => cat.id === +this.expenseForm.get('category').value);
				editedExpense.expireAt = this.expenseForm.get('expireAt').value;
				this.store.dispatch(new UpdateExpense(editedExpense));
			});
		} else {
			this.store.select(authLoggedUser).subscribe((user: User) => {
				this.store.dispatch(
					new CreateExpense(new Expense(-1,
						this.expenseForm.get('name').value,
						this.categories.find((cat: Category) => cat.id === +this.expenseForm.get('category').value),
						user,
						this.expenseForm.get('value').value,
						this.expenseForm.get('expireAt').value)));
			});
		}
		this.resetModal();
	}

	initForm () {
		let name = '';
		let value = 0;
		const dp = new DatePipe('en-en');
		let expireAt = dp.transform(new Date(), this.DATE_FORMAT);
		if (this.editMode) {
			this.expenseState.subscribe((expenseState: ExpenseState) => {
				name = expenseState.expenses.find((exp: Expense) => exp.id === this.currentId).name;
				value = expenseState.expenses.find((exp: Expense) => exp.id === this.currentId).value;
				this.category = expenseState.expenses.find((exp: Expense) => exp.id === this.currentId).category;
				expireAt = dp.transform(expenseState.expenses.find((exp: Expense) => exp.id === this.currentId).expireAt, this.DATE_FORMAT);
			});
		}
		this.expenseForm = new FormGroup({
			'name': new FormControl(name, Validators.required),
			'value': new FormControl(value, Validators.min(1)),
			'category': new FormControl(this.category ? this.category.id : -1, Validators.required),
			'expireAt': new FormControl(expireAt, Validators.required)
		});
	}

	editExpense (id: number) {
		this.currentId = id;
		this.editMode = true;
		this.initForm();
		this.openModal();
	}

	deleteExpense (id: number) {
		this.currentId = id;
		this.showConfirm = true;
	}

	confirmDelete (confirm: boolean) {
		if (confirm) {
			this.store.dispatch(new DeleteExpense(this.currentId));
		}
		this.resetModal();
	}

}
