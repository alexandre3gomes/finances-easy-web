import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Default } from '../../shared/enum/default.enum';
import { Pagination } from '../../shared/model/pagination/pagination.model';
import { AppState } from '../../store/app.reducers';
import { category } from '../../store/app.selectors';
import { ListCategories, ResetCategories } from '../category/store/category.actions';
import { DeleteBudget, ListBudgets, ResetBudgets } from './store/budget.actions';
import { budgets } from './store/budget.selectors';

@Component({
	selector: 'app-budget',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'budget.component.html'
})
export class BudgetComponent implements OnInit, OnDestroy {

	DATE_FORMAT = 'L';
	budgetState = this.store.select(budgets);
	categoryState = this.store.select(category);
	showConfirm = false;
	editModal = false;
	currentId: number;
	breakperiods: Array<number> = new Array();
	currentPage = 0;

	constructor(private store: Store<AppState>) { }

	resetData() {
		this.editModal = false;
		this.currentId = -1;
	}

	ngOnInit() {
		this.store.dispatch(new ListCategories(new Pagination(Default.START_PAGE, Default.MAX_SIZE)));
		this.store.dispatch(new ListBudgets(new Pagination(Default.START_PAGE, Default.PAGE_SIZE)));
		this.breakperiods.push(1);
		this.breakperiods.push(2);
	}

	ngOnDestroy() {
		this.store.dispatch(new ResetBudgets());
		this.store.dispatch(new ResetCategories());
		this.resetData();
	}

	openModal() {
		this.editModal = true;
	}

	editBudget(id: number) {
		this.currentId = id;
		this.openModal();
	}

	deleteBudget(id: number) {
		this.currentId = id;
		this.showConfirm = true;
	}

	confirmDelete(confirm: boolean) {
		if (confirm) {
			this.store.dispatch(new DeleteBudget(this.currentId));
		}
		this.resetData();
	}

	showMore() {
		this.currentPage++;
		this.store.dispatch(new ListBudgets(new Pagination(this.currentPage, Default.PAGE_SIZE)));
	}

}
