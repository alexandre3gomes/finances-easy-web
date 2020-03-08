import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Default } from '../../shared/enum/default.enum';
import { Pagination } from '../../shared/model/pagination/pagination.model';
import { AppState } from '../../store/app.reducers';
import { savings } from '../../store/app.selectors';
import { ListCategories, ResetCategories } from '../category/store/category.actions';
import { ResetExpenses } from '../expense/store/expense.actions';
import { ResetIncomes } from '../income/store/income.actions';
import { DeleteSavings, ListSavings, ResetSavings } from './store/savings.actions';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.scss']
})
export class SavingsComponent implements OnInit {

	state = this.store.select(savings);
	editModal = false;
	savingsForm: FormGroup;
	currentId: number;
	showConfirm = false;
	currentPage = 0;
	DATE_FORMAT = 'L';

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.store.dispatch(new ListSavings(new Pagination(this.currentPage, Default.PAGE_SIZE)));
		this.store.dispatch(new ListCategories(new Pagination(this.currentPage, Default.MAX_SIZE)));
	}

	ngOnDestroy() {
		this.resetData();
		this.store.dispatch(new ResetSavings());
		this.store.dispatch(new ResetIncomes());
		this.store.dispatch(new ResetExpenses());
		this.store.dispatch(new ResetCategories());
	}

	openModal() {
		this.editModal = true;
	}

	editSavings(id: number) {
		this.currentId = id;
		this.openModal();
	}

	deleteSavings(id: number) {
		this.currentId = id;
		this.showConfirm = true;
	}

	confirmDelete(confirm: boolean) {
		if (confirm) {
			this.store.dispatch(new DeleteSavings(this.currentId));
		}
		this.resetData();
	}

	resetData() {
		this.showConfirm = false;
		this.editModal = false;
		this.currentId = -1;
		this.currentPage = 0;
	}

	showMore() {
		this.currentPage++;
		this.store.dispatch(new ListSavings(new Pagination(this.currentPage, Default.PAGE_SIZE)));
	}

}
