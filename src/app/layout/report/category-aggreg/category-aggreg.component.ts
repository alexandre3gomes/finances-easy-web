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
	public budgetId: number = -1;
	public reportForm: FormGroup;

	constructor(public store: Store<AppState>) { }

	ngOnInit() {
		this.reportForm = new FormGroup({
			'budget': new FormControl(this.budgetId, Validators.required),
		});
		this.store.dispatch(new ListBudgets(new Pagination(Default.START_PAGE, Default.MAX_SIZE)));
		this.budgets.subscribe((stateBudgets: Budget[]) => {
			let currBudget = stateBudgets.filter(bud => new Date(bud.startDate) <= new Date() && new Date(bud.endDate) >= new Date());
			if (currBudget.length > 0) {
				this.budgetId = currBudget[0].id;
				this.store.dispatch(new ListCategoryAggregValues(currBudget[0].id));
			}
		});
	}

	ngOnDestroy() {
		this.store.dispatch(new ResetBudgets());
	}

	loadBudgetData() {
		if (+this.reportForm.get('budget').value > 0) {
			this.store.dispatch(new ListCategoryAggregValues(+this.reportForm.get('budget').value ));
		} else {
			this.store.dispatch(new ShowAlertError('Please select a budget'));
		}
	}

}
