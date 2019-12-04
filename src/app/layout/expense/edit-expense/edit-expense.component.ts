import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { authLoggedUser } from '../../../auth/store/auth.selectors';
import { Default } from '../../../shared/enum/default.enum';
import { Category } from '../../../shared/model/category.model';
import { Expense } from '../../../shared/model/expense.model';
import { Pagination } from '../../../shared/model/pagination/pagination.model';
import { User } from '../../../shared/model/user.model';
import { AppState } from '../../../store/app.reducers';
import { ListCategories, ResetCategories } from '../../category/store/category.actions';
import { categories } from '../../category/store/category.selectors';
import { CreateExpense, UpdateExpense } from '../store/expense.actions';
import { ExpenseState } from '../store/expense.reducers';
import { expenses } from '../store/expense.selectors';


@Component({
	selector: 'app-edit-expense',
	templateUrl: './edit-expense.component.html'
})
export class EditExpenseComponent implements OnInit, OnDestroy {

	@Input() state;
	expenseForm: FormGroup;
	category: Category;
	@Input() currentId: number;
	categories: Category[];
	@Output() closed = new EventEmitter<void>();

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.store.select(categories).subscribe((categoriesState: Category[]) => {
			if (categoriesState.length === 0) {
				this.store.dispatch(new ListCategories(new Pagination(Default.START_PAGE, Default.MAX_SIZE)));
			}
			this.categories = categoriesState;
		});
		this.initForm();
	}

	ngOnDestroy() {
		this.currentId = -1;
		this.store.dispatch(new ResetCategories());
	}

	initForm() {
		let name = '';
		let value = 0;
		let expireAt = new Date();
		if (this.currentId > 0) {
			this.state.subscribe((expenseState: ExpenseState) => {
				const expense = expenseState.expenses.find((exp: Expense) => exp.id === this.currentId);
				if (expense) {
					name = expense.name;
					value = expense.value;
					this.category = expense.category;
					expireAt = expense.expireAt;
				}
			});
		}
		this.expenseForm = new FormGroup({
			'name': new FormControl(name, Validators.required),
			'value': new FormControl(value, Validators.min(0.1)),
			'category': new FormControl(this.category ? this.category.id : -1, Validators.required),
			'expireAt': new FormControl(expireAt, Validators.required)
		});
	}

	saveChanges() {
		const expireAt = this.expenseForm.get('expireAt').value;
		expireAt.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
		if (this.currentId > 0) {
			let editedExpense: Expense;
			this.store.select(expenses).subscribe((expensesState: Expense[]) => {
				editedExpense = expensesState.find((exp: Expense) => exp.id === this.currentId);
			});
			if (editedExpense) {
				editedExpense.name = this.expenseForm.get('name').value;
				editedExpense.value = this.expenseForm.get('value').value;
				editedExpense.category = this.categories.find((cat: Category) => cat.id === +this.expenseForm.get('category').value);
				editedExpense.expireAt = expireAt;
				this.store.dispatch(new UpdateExpense(editedExpense));
			}
			this.closed.emit();
		} else {
			let loggedUser: User;
			this.store.select(authLoggedUser).subscribe((user: User) => {
				take(1),
				loggedUser = user;
			});
			const createdExpense = new Expense(-1,
				this.expenseForm.get('name').value,
				this.categories.find((cat: Category) => cat.id === +this.expenseForm.get('category').value),
				loggedUser,
				this.expenseForm.get('value').value,
				expireAt);
			this.store.dispatch(new CreateExpense(createdExpense));
			this.closed.emit();
		}
	}

	closeModal() {
		this.closed.emit();
	}

}
