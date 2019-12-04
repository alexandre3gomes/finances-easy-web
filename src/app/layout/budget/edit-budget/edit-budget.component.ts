import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { authLoggedUser } from '../../../auth/store/auth.selectors';
import { BudgetCategory } from '../../../shared/model/budget/budget-category.model';
import { Budget } from '../../../shared/model/budget/budget.model';
import { Category } from '../../../shared/model/category.model';
import { User } from '../../../shared/model/user.model';
import { AppState } from '../../../store/app.reducers';
import { CreateBudget, UpdateBudget } from '../store/budget.actions';
import { BudgetState } from '../store/budget.reducers';
import { budgets } from '../store/budget.selectors';
import { take } from 'rxjs/operators';


@Component({
	selector: 'app-edit-budget',
	templateUrl: './edit-budget.component.html'
})
export class EditBudgetComponent implements OnInit {

	@Input() state;
	budgetForm: FormGroup;
	category: Category;
	user: User;
	fb = new FormBuilder();
	DATE_FORMAT = 'l';
	@Input() breakperiods: Array<number>;
	@Input() currentId: number;
	@Input() categories: Array<Category>;
	@Output() closed = new EventEmitter<void>();

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.store.select(authLoggedUser).subscribe((loggedUser: User) => {
			this.user = loggedUser;
		});
		this.initForm();
	}

	initForm() {
		let startDate = new Date();
		let endDate = new Date();
		const breakpoint = 1;
		const frmArray = this.fb.array([]);
		if (this.currentId > 0) {
			this.state.subscribe((budgetState: BudgetState) => {
				const budget = budgetState.budgets.find((bud: Budget) => bud.id === this.currentId);
				if (budget) {
					this.user = budget.user;
					startDate = budget.startDate;
					endDate = budget.endDate;
					const orderedCategories = budget.categories.sort((cat1, cat2) => cat1.category.name.localeCompare(cat2.category.name));
					for (let x = 0; x < orderedCategories.length; x++) {
						const frmGroup = this.fb.group({
							'category': this.fb.control(budget.categories[x].category.id, Validators.required),
							'value': this.fb.control(budget.categories[x].value, Validators.min(0.1))
						});
						frmArray.push(frmGroup);
					}

				}
			});
		} else {
			frmArray.push(this.categoryBudgetGroup);
		}
		this.budgetForm = this.fb.group({
			'startDate': new FormControl(startDate, Validators.required),
			'endDate': new FormControl(endDate, Validators.required),
			'breakperiod': new FormControl(breakpoint, Validators.required),
			categoryBudgetControls: frmArray
		});
	}

	get categoryBudgetGroup() {
		return this.fb.group({
			'category': this.fb.control('', Validators.required),
			'value': this.fb.control('', Validators.min(0.1))
		});
	}

	get categoryBudgetControls() {
		return this.budgetForm.get('categoryBudgetControls') as FormArray;
	}

	addCategoryBudget() {
		this.categoryBudgetControls.push(this.categoryBudgetGroup);
	}

	removeCategoryBudget(idx: number) {
		this.categoryBudgetControls.removeAt(idx);
	}

	saveChanges() {
		const startDate = this.budgetForm.get('startDate').value;
		const endDate = this.budgetForm.get('endDate').value;
		const breakperiod = this.budgetForm.get('breakperiod').value;
		let editedBudget;
		if (this.currentId > 0) {
			this.store.select(budgets).subscribe((budgetsState: Budget[]) => {
				take(1),
				editedBudget = budgetsState.find((exp: Budget) => exp.id === this.currentId);
			});
			if (editedBudget) {
				editedBudget.startDate = startDate;
				editedBudget.endDate = endDate;
				editedBudget.breakperiod = breakperiod;
				const budgetCategories = new Array();
				for (let idx = 0; idx < this.categoryBudgetControls.controls.length; idx++) {
					const frmGrp = this.categoryBudgetControls.controls[idx];
					const cat = this.categories.find((cate: Category) => cate.id === parseInt(frmGrp.get('category').value, 0));
					budgetCategories.push(new BudgetCategory(cat, frmGrp.get('value').value));
				}
				editedBudget.categories = budgetCategories;
				this.store.dispatch(new UpdateBudget(editedBudget));
			}
		} else {
			const budgetCategories = new Array();
			for (let idx = 0; idx < this.categoryBudgetControls.controls.length; idx++) {
				const frmGrp = this.categoryBudgetControls.controls[idx];
				const cat = this.categories.find((cate: Category) => cate.id === parseInt(frmGrp.get('category').value, 0));
				budgetCategories.push(new BudgetCategory(cat, frmGrp.get('value').value));
			}
			this.store.dispatch(
				new CreateBudget(new Budget(-1,
					this.user,
					startDate,
					endDate,
					breakperiod,
					budgetCategories)));

		}
		this.closed.emit();
	}

	closeModal() {
		this.closed.emit();
	}
}
