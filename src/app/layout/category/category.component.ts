import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';

import { Default } from '../../shared/enum/default.enum';
import { Pagination } from '../../shared/model/pagination/pagination.model';
import { DeleteCategory, ListCategories, ResetCategories } from './store/category.actions';
import { categories } from './store/category.selectors';



@Component({
	selector: 'app-category',
	templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit, OnDestroy {

	state = this.store.select(categories);
	currentId: number;
	showConfirm = false;
	editModal = false;
	currentPage = 0;

	constructor(private store: Store<AppState>) { }

	ngOnInit () {
		this.store.dispatch(new ListCategories(new Pagination(Default.START_PAGE, Default.PAGE_SIZE)));
	}

	ngOnDestroy () {
		this.resetData();
		this.store.dispatch(new ResetCategories());
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

	editCategory (id: number) {
		this.currentId = id;
		this.openModal();
	}

	deleteCategory (id: number) {
		this.currentId = id;
		this.showConfirm = true;
	}

	confirmDelete (confirm: boolean) {
		if (confirm) {
			this.store.dispatch(new DeleteCategory(this.currentId));
		}
		this.resetData();
	}

	showMore () {
		this.currentPage++;
		this.store.dispatch(new ListCategories(new Pagination(this.currentPage, Default.PAGE_SIZE)));
	}
}
