import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Default } from '../../shared/enum/default.enum';
import { Category } from '../../shared/model/category.model';
import { Filter } from '../../shared/model/pagination/filter.model';
import { Pagination } from '../../shared/model/pagination/pagination.model';
import { AppState } from '../../store/app.reducers';
import { expense } from '../../store/app.selectors';
import { ListCategories, ResetCategories } from '../category/store/category.actions';
import { categories } from '../category/store/category.selectors';
import { DeleteExpense, ListExpenses, ResetExpenses } from './store/expense.actions';



@Component({
	selector: 'app-expense',
	templateUrl: './expense.component.html',
	styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit, OnDestroy {

	state = this.store.select(expense);
	currentId: number;
	showConfirm = false;
	categories: Category[];
	editModal = false;
	currentPage = 0;
	DATE_FORMAT = 'L';
	filtersForm: FormGroup;
	filters: Filter;

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.store.dispatch(new ListExpenses(new Pagination(this.currentPage, Default.PAGE_SIZE)));
		this.store.dispatch(new ListCategories(new Pagination(Default.START_PAGE, Default.MAX_SIZE)));
		this.store.select(categories).subscribe((categoriesState: Category[]) => {
			this.categories = categoriesState;
		});
		this.initForm();
	}

	initForm() {
		this.filtersForm = new FormGroup({
			'startDate': new FormControl(''),
			'endDate': new FormControl(''),
			'category': new FormControl(''),
		})
	}

	ngOnDestroy() {
		this.resetData();
		this.store.dispatch(new ResetCategories());
		this.store.dispatch(new ResetExpenses());
	}

	openModal() {
		this.editModal = true;
	}

	resetData() {
		this.showConfirm = false;
		this.editModal = false;
		this.currentId = -1;
		this.currentPage = 0;
	}

	editExpense(id: number) {
		this.currentId = id;
		this.openModal();
	}

	deleteExpense(id: number) {
		this.currentId = id;
		this.showConfirm = true;
	}

	confirmDelete(confirm: boolean) {
		if (confirm) {
			this.store.dispatch(new DeleteExpense(this.currentId));
		}
		this.resetData();
	}

	showMore() {
		this.currentPage++;
		this.store.dispatch(new ListExpenses(new Pagination(this.currentPage, Default.PAGE_SIZE)));
	}

	search() {
		this.filters = new Filter(this.filtersForm.get('startDate').value, this.filtersForm.get('endDate').value, new Category(this.filtersForm.get('category').value, ''));
		this.store.dispatch(new ListExpenses(new Pagination(this.currentPage, Default.PAGE_SIZE)));
	}
}
