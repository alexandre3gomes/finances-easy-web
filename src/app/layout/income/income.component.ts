import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Default } from '../../shared/enum/default.enum';
import { Page } from '../../shared/model/pagination/page.model';
import { Pagination } from '../../shared/model/pagination/pagination.model';
import { AppState } from '../../store/app.reducers';
import { DeleteIncome, ListIncomes, ResetIncomes } from './store/income.actions';
import { IncomeState } from './store/income.reducers';



@Component({
	selector: 'app-income',
	templateUrl: './income.component.html'
})
export class IncomeComponent implements OnInit, OnDestroy {
	state = this.store.select('income');
	editModal = false;
	incomeForm: FormGroup;
	currentId: number;
	showConfirm = false;
	currentPage = 0;
	pageOptions: Page;
	DATE_FORMAT = 'L';

	constructor(private store: Store<AppState>) { }

	ngOnInit () {
		this.store.dispatch(new ListIncomes(new Pagination(this.currentPage, Default.PAGE_SIZE)));
		this.state.subscribe((incomeState: IncomeState) => {
			this.pageOptions = incomeState.page;
		});
	}

	ngOnDestroy () {
		this.resetData();
		this.store.dispatch(new ResetIncomes());
	}

	openModal () {
		this.editModal = true;
	}

	editIncome (id: number) {
		this.currentId = id;
		this.openModal();
	}

	deleteIncome (id: number) {
		this.currentId = id;
		this.showConfirm = true;
	}

	confirmDelete (confirm: boolean) {
		if (confirm) {
			this.store.dispatch(new DeleteIncome(this.currentId));
		}
		this.closedEditModal(confirm);
	}

	resetData () {
		this.showConfirm = false;
		this.editModal = false;
		this.currentId = -1;
		this.currentPage = 0;
	}

	closedEditModal (saved: boolean) {
		this.resetData();
		if (saved) {
			this.store.dispatch(new ResetIncomes());
			setTimeout(() => {
				this.store.dispatch(new ListIncomes(new Pagination(this.currentPage, Default.PAGE_SIZE)));
			}, 300);
		}
	}

	showMore () {
		this.currentPage++;
		this.store.dispatch(new ListIncomes(new Pagination(this.currentPage, Default.PAGE_SIZE)));
	}

}
