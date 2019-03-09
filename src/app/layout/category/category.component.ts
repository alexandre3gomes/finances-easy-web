import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { Category } from '../../shared/model/category.model';
import { CreateCategory, DeleteCategory, ListCategories, UpdateCategory } from './store/category.actions';
import { CategoryState } from './store/category.reducers';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit, OnDestroy {

	categoryState = this.store.select('category');
	editMode = false;
	modalVisible = false;
	categoryForm: FormGroup;
	currentId: number;
	showConfirm = false;

	constructor(private store: Store<AppState>) { }

	ngOnInit () {
		this.initForm();
		this.store.dispatch(new ListCategories());
	}

	ngOnDestroy () {
		this.resetModal();
	}

	openModal () {
		this.modalVisible = true;
	}

	resetModal () {
		this.modalVisible = false;
		this.editMode = false;
		this.showConfirm = false;
		this.currentId = -1;
		this.initForm();
	}

	saveChanges () {
		if (this.editMode) {
			this.store.select('category').subscribe((categoryState: CategoryState) => {
				const editedCategory = categoryState.categories.find((inc: Category) => inc.id === this.currentId);
				editedCategory.name = this.categoryForm.get('name').value;
				this.store.dispatch(new UpdateCategory(editedCategory));
			});
		} else {
			this.store.dispatch(new CreateCategory(new Category(-1, this.categoryForm.get('name').value)));
		}
		this.resetModal();
	}

	initForm () {
		let name = '';
		if (this.editMode) {
			this.categoryState.subscribe((categoryState: CategoryState) => {
				name = categoryState.categories.find((inc: Category) => inc.id === this.currentId).name;
			});
		}
		this.categoryForm = new FormGroup({
			'name': new FormControl(name, Validators.required)
		});
	}

	editCategory (id: number) {
		this.currentId = id;
		this.editMode = true;
		this.initForm();
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
		this.resetModal();
	}

}
