import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Category } from '../../../shared/model/category.model';
import { AppState } from '../../../store/app.reducers';
import { CreateCategory, UpdateCategory } from '../store/category.actions';
import { categories } from '../store/category.selectors';


@Component({
	selector: 'app-edit-category',
	templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent implements OnInit, OnDestroy {

	categoryForm: FormGroup;
	@Input() currentId: number;
	@Output() closed = new EventEmitter<void>();

	constructor(private store: Store<AppState>) { }

	ngOnInit () {
		this.initForm();
	}

	ngOnDestroy () {
		this.currentId = -1;
	}

	initForm () {
		let name = '';
		if (this.currentId > 0) {
			this.store.select(categories).subscribe((cats: Category[]) => {
				const category = cats.find((inc: Category) => inc.id === this.currentId);
				if (category) {
					name = category.name;
				}
			});
		}
		this.categoryForm = new FormGroup({
			'name': new FormControl(name, Validators.required)
		});
	}

	saveChanges () {
		if (this.currentId > 0) {
			this.store.select(categories).subscribe((cats: Category[]) => {
				const editedCategory = cats.find((inc: Category) => inc.id === this.currentId);
				if (editedCategory) {
					editedCategory.name = this.categoryForm.get('name').value;
					this.store.dispatch(new UpdateCategory(editedCategory));
				}
			});
		} else {
			this.store.dispatch(new CreateCategory(new Category(-1, this.categoryForm.get('name').value, false)));
		}
		this.closed.emit();
	}

	closeModal () {
		this.closed.emit();
	}

}
