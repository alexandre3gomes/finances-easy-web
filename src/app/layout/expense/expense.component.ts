import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Default } from '../../shared/enum/default.enum';
import { Category } from '../../shared/model/category.model';
import { Pagination } from '../../shared/model/pagination/pagination.model';
import { AppState } from '../../store/app.reducers';
import { DeleteExpense, ListExpenses, ResetExpenses } from './store/expense.actions';



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
	DATE_FORMAT = 'L';

	constructor(private store: Store<AppState>) { }

	ngOnInit () {
		this.store.dispatch(new ListExpenses(new Pagination(this.currentPage, Default.PAGE_SIZE)));
	}

	ngOnDestroy () {
		this.resetData();
		this.store.dispatch(new ResetExpenses());
	}

	openModal () {
		this.editModal = true;
	}

	resetData () {
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
		this.closedEditModal(confirm);
	}

	closedEditModal (saved: boolean) {
		this.resetData();
		if (saved) {
			this.store.dispatch(new ResetExpenses());
			setTimeout(() => {
				this.store.dispatch(new ListExpenses(new Pagination(this.currentPage, Default.PAGE_SIZE)));
			}, 300);
		}
	}

	showMore () {
		this.currentPage++;
		this.store.dispatch(new ListExpenses(new Pagination(this.currentPage, Default.PAGE_SIZE)));
	}
}
