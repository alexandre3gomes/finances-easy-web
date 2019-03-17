import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Default } from '../../shared/enum/default.enum';
import { Category } from '../../shared/model/category.model';
import { Page } from '../../shared/model/pagination/page.model';
import { Pagination } from '../../shared/model/pagination/pagination.model';
import { AppState } from '../../store/app.reducers';
import { ListCategories, ResetCategories } from '../category/store/category.actions';
import { CategoryState } from '../category/store/category.reducers';
import { DeleteExpense, ListExpenses, ResetExpenses } from './store/expense.actions';
import { ExpenseState } from './store/expense.reducers';


@Component({
	selector: 'app-expense',
	templateUrl: './expense.component.html',
	styleUrls: [ './expense.component.scss' ]
})
export class ExpenseComponent implements OnInit, OnDestroy {

	state = this.store.select('expense');
	currentId: number;
	showConfirm = false;
	categories: Category[];
	editModal = false;
	currentPage = 0;
	pageOptions: Page;

	constructor(private store: Store<AppState>) { }

	ngOnInit () {
		this.store.dispatch(new ListExpenses(new Pagination(this.currentPage, Default.PAGE_SIZE)));
		this.store.select('category').subscribe((categoryState: CategoryState) => {
			if (categoryState.categories.length <= 0) {
				this.store.dispatch(new ListCategories(new Pagination(Default.START_PAGE, Default.MAX_SIZE)));
			}
			this.categories = categoryState.categories;
		});
		this.state.subscribe((expenseState: ExpenseState) => {
			this.pageOptions = expenseState.page;
		});
	}

	ngOnDestroy () {
		this.resetData();
	}

	openModal () {
		this.editModal = true;
	}

	resetData () {
		this.store.dispatch(new ResetExpenses());
		this.store.dispatch(new ResetCategories());
		this.showConfirm = false;
		this.editModal = false;
		this.currentId = -1;
		this.currentPage = 0;
	}

	editExpense (id: number) {
		this.currentId = id;
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
		this.closedEditModal();
	}

	closedEditModal () {
		this.resetData();
		setTimeout(() => {
			this.store.dispatch(new ListExpenses(new Pagination(this.currentPage, Default.PAGE_SIZE)));
		}, 100);
	}

	showMore () {
		this.currentPage++;
		this.store.dispatch(new ListExpenses(new Pagination(this.currentPage, Default.PAGE_SIZE)));
	}
}
