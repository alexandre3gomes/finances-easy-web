import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { Default } from '../../shared/enum/default.enum';
import { Page } from '../../shared/model/pagination/page.model';
import { Pagination } from '../../shared/model/pagination/pagination.model';
import { DeleteCategory, ListCategories, ResetCategories } from './store/category.actions';
import { CategoryState } from './store/category.reducers';



@Component({
	selector: 'app-category',
	templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit, OnDestroy {

	state = this.store.select('category');
	currentId: number;
	showConfirm = false;
	editModal = false;
	currentPage = 0;
	pageOptions: Page;

	constructor(private store: Store<AppState>) { }

	ngOnInit () {
		this.store.dispatch(new ListCategories(new Pagination(Default.START_PAGE, Default.PAGE_SIZE)));
		this.state.subscribe((categoryState: CategoryState) => {
			this.pageOptions = categoryState.page;
		});
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
		this.closedEditModal(confirm);
	}

	closedEditModal (saved: boolean) {
		this.resetData();
		if (saved) {
			setTimeout(() => {
				this.store.dispatch(new ListCategories(new Pagination(this.currentPage, Default.PAGE_SIZE)));
			}, 100);
		}
	}

	showMore () {
		this.currentPage++;
		this.store.dispatch(new ListCategories(new Pagination(this.currentPage, Default.PAGE_SIZE)));
	}
}
