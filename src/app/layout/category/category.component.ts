import { Component, OnInit } from '@angular/core';
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
export class CategoryComponent implements OnInit {

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

	openModal () {
		this.modalVisible = true;
	}

	closeModal () {
		this.modalVisible = false;
		this.editMode = false;
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
		this.closeModal();
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
		this.showConfirm = false;
		this.currentId = -1;
	}

}
