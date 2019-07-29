import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Default } from '../../../shared/enum/default.enum';
import { Budget } from '../../../shared/model/budget/budget.model';
import { Pagination } from '../../../shared/model/pagination/pagination.model';
import { ShowAlertError } from '../../../store/alert.actions';
import { AppState } from '../../../store/app.reducers';
import { report } from '../../../store/app.selectors';
import { ListBudgets, ResetBudgets } from '../../budget/store/budget.actions';
import { budgets } from '../../budget/store/budget.selectors';
import { ListCategoryAggregValues } from '../store/report.actions';

@Component({
	selector: 'app-category-aggreg',
	templateUrl: './category-aggreg.component.html',
	styleUrls: [ './category-aggreg.component.scss' ]
})
export class CategoryAggregComponent implements OnInit, OnDestroy {

	public state = this.store.select(report);
	public budgets = this.store.select(budgets);
	public budget: Budget;
	public reportForm: FormGroup;

	constructor(public store: Store<AppState>) { }

	ngOnInit() {
		this.reportForm = new FormGroup({
			'budget': new FormControl(this.budget, Validators.required),
		});
		this.store.dispatch(new ListBudgets(new Pagination(Default.START_PAGE, Default.MAX_SIZE)));
		this.budgets.subscribe((stateBudgets: Budget[]) => {
			if (stateBudgets.length === 1) {
				this.store.dispatch(new ListCategoryAggregValues(stateBudgets[ 0 ].id));
			}
		});
	}

	ngOnDestroy() {
		this.store.dispatch(new ResetBudgets());
	}

	loadBudgetData() {
		if (this.budget) {
			this.store.dispatch(new ListCategoryAggregValues(this.budget.id));
		} else {
			this.store.dispatch(new ShowAlertError('Please select a budget'));
		}
	}

}
