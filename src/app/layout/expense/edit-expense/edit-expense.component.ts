import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authLoggedUser } from '../../../auth/store/auth.selectors';
import { Category } from '../../../shared/model/category.model';
import { Expense } from '../../../shared/model/expense.model';
import { User } from '../../../shared/model/user.model';
import { AppState } from '../../../store/app.reducers';
import { CreateExpense, UpdateExpense } from '../store/expense.actions';
import { ExpenseState } from '../store/expense.reducers';


@Component({
	selector: 'app-edit-expense',
	templateUrl: './edit-expense.component.html'
})
export class EditExpenseComponent implements OnInit {

	@Input() state;
	expenseForm: FormGroup;
	DATE_FORMAT = 'yyyy-MM-ddThh:mm';
	category: Category;
	@Input() currentId: number;
	@Input() categories: Category[];
	@Output() closed = new EventEmitter<void>();

	constructor(private store: Store<AppState>) { }

	ngOnInit () {
		this.initForm();
	}

	initForm () {
		let name = '';
		let value = 0;
		const dp = new DatePipe('en-en');
		let expireAt = dp.transform(new Date(), this.DATE_FORMAT);
		if (this.currentId > 0) {
			this.state.subscribe((expenseState: ExpenseState) => {
				const expense = expenseState.expenses.find((exp: Expense) => exp.id === this.currentId);
				if (expense) {
					name = expense.name;
					value = expense.value;
					this.category = expense.category;
					expireAt = dp.transform(expense.expireAt, this.DATE_FORMAT);
				}
			});
		}
		this.expenseForm = new FormGroup({
			'name': new FormControl(name, Validators.required),
			'value': new FormControl(value, Validators.min(1)),
			'category': new FormControl(this.category ? this.category.id : -1, Validators.required),
			'expireAt': new FormControl(expireAt, Validators.required)
		});
	}

	saveChanges () {
		if (this.currentId > 0) {
			this.store.select('expense').subscribe((expenseState: ExpenseState) => {
				const editedExpense = expenseState.expenses.find((exp: Expense) => exp.id === this.currentId);
				if (editedExpense) {
					editedExpense.name = this.expenseForm.get('name').value;
					editedExpense.value = this.expenseForm.get('value').value;
					editedExpense.category = this.categories.find((cat: Category) => cat.id === +this.expenseForm.get('category').value);
					editedExpense.expireAt = this.expenseForm.get('expireAt').value;
					this.store.dispatch(new UpdateExpense(editedExpense));
				}
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
		this.closeModal();
	}

	closeModal () {
		this.closed.emit();
	}

}
