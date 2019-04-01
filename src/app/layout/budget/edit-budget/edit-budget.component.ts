import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../auth/store/auth.reducers';
import { BudgetCategory } from '../../../shared/model/budget-category.model';
import { Breakpoint } from '../../../shared/model/budget/breakpoing.model';
import { Budget } from '../../../shared/model/budget/budget.model';
import { Category } from '../../../shared/model/category.model';
import { User } from '../../../shared/model/user.model';
import { AppState } from '../../../store/app.reducers';
import { CreateBudget, UpdateBudget } from '../store/budget.actions';
import { BudgetState } from '../store/budget.reducers';


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
	@Input() breakpoints: Array<Breakpoint>;
	@Input() currentId: number;
	@Input() categories: Array<Category>;
	@Output() closed = new EventEmitter<void>();

	constructor(private store: Store<AppState>) { }

	ngOnInit () {
		this.store.select('auth').subscribe((authState: AuthState) => {
			this.user = authState.loggedUser;
		});
		this.initForm();
	}

	initForm () {
		let startDate = new Date();
		let endDate = new Date();
		let breakpoint = new Breakpoint(1, 'Monthly');
		let budgetCat: BudgetCategory[];
		if (this.currentId > 0) {
			this.state.subscribe((budgetState: BudgetState) => {
				const budget = budgetState.budgets.find((bud: Budget) => bud.id === this.currentId);
				if (budget) {
					this.user = budget.user;
					startDate = budget.startDate;
					endDate = budget.endDate;
					breakpoint = budget.breakpoint;
					budgetCat = budget.categories;
				}
			});
		}
		this.budgetForm = this.fb.group({
			'startDate': new FormControl(startDate, Validators.required),
			'endDate': new FormControl(endDate, Validators.required),
			'breakpoint': new FormControl(breakpoint, Validators.required),
			categoryBudgetControls: this.fb.array([
				this.categoryBudgetGroup
			])
		});
	}

	get categoryBudgetGroup () {
		return this.fb.group({
			'category': this.fb.control('', Validators.required),
			'value': this.fb.control('', Validators.min(0.1))
		});
	}

	get categoryBudgetControls () {
		return this.budgetForm.get('categoryBudgetControls') as FormArray;
	}

	addCategoryBudget () {
		this.categoryBudgetControls.push(this.categoryBudgetGroup);
	}

	removeCategoryBudget () {
		this.categoryBudgetControls.removeAt(this.categoryBudgetControls.length - 1);
	}

	saveChanges () {
		const startDate = this.budgetForm.get('startDate').value;
		const endDate = this.budgetForm.get('endDate').value;
		const breakpoint = this.budgetForm.get('breakpoint').value;
		if (this.currentId > 0) {
			this.store.select('budget').subscribe((budgetState: BudgetState) => {
				const editedBudget = budgetState.budgets.find((exp: Budget) => exp.id === this.currentId);
				if (editedBudget) {
					editedBudget.startDate = startDate;
					editedBudget.endDate = endDate;
					editedBudget.breakpoint = breakpoint;
					const budgetCategories = new Array();
					for (let idx = 0; idx < this.categoryBudgetControls.controls.length; idx++) {
						const frmGrp = this.categoryBudgetControls.controls[ idx ];
						const cat = this.categories.find((cate: Category) => cate.id === parseInt(frmGrp.get('category').value, 0));
						budgetCategories.push(new BudgetCategory(cat, frmGrp.get('value').value));
					}
					editedBudget.categories = budgetCategories;
					this.store.dispatch(new UpdateBudget(editedBudget));
				}
			});
		} else {
			const budgetCategories = new Array();
			for (let idx = 0; idx < this.categoryBudgetControls.controls.length; idx++) {
				const frmGrp = this.categoryBudgetControls.controls[ idx ];
				const cat = this.categories.find((cate: Category) => cate.id === parseInt(frmGrp.get('category').value, 0));
				budgetCategories.push(new BudgetCategory(cat, frmGrp.get('value').value));
			}
			this.store.dispatch(
				new CreateBudget(new Budget(-1,
					this.user,
					startDate,
					endDate,
					breakpoint,
					budgetCategories)));

		}
		this.closeModal();
	}

	closeModal () {
		this.closed.emit();
	}
}
