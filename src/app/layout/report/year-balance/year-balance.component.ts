import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Default } from '../../../shared/enum/default.enum';
import { Budget } from '../../../shared/model/budget/budget.model';
import { Pagination } from '../../../shared/model/pagination/pagination.model';
import { CategoryAggregValues } from '../../../shared/model/report/category-aggreg-values.model';
import { ShowAlertError } from '../../../store/alert.actions';
import { AppState } from '../../../store/app.reducers';
import { report } from '../../../store/app.selectors';
import { ListBudgets, ResetBudgets } from '../../budget/store/budget.actions';
import { budgets } from '../../budget/store/budget.selectors';
import { ListCategoryAggregValues, ListIncomePeriod } from '../store/report.actions';

@Component({
	selector: 'app-year-balance',
	templateUrl: './year-balance.component.html',
	styleUrls: [ './year-balance.component.scss' ]
})
export class YearBalanceComponent implements OnInit, OnDestroy {

	public state = this.store.select(report);
	public budgets = this.store.select(budgets);
	public reportForm: FormGroup;
	public periods: Array<Date>;
	public catAggValues: Array<CategoryAggregValues>;
	public total: Array<number>;
	public balance: Array<number>;
	public accumulatedBalance: Array<number>;
	public FORECAST_INCOME = 2600;
	public budgetId: number = -1;

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
				this.store.dispatch(new ListIncomePeriod(currBudget[0].id));
			}
		});
		this.state.subscribe((repState) => {
			this.total = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
			this.accumulatedBalance = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
			this.balance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			repState.catVal.forEach(catVal => {
				this.periods = catVal.periodValue.map(per => {
					return per.endDate;
				});
				for (let x = 0; x <= catVal.periodValue.length; x++) {
					if (catVal.periodValue[ x ]) {
						if (new Date(catVal.periodValue[ x ].endDate).getTime() <= new Date().getTime()) {
							this.total[ x ] += catVal.periodValue[ x ].actualValue;
						} else {
							this.total[ x ] += catVal.periodValue[ x ].plannedValue;
						}
					}
				}
			});
			for (let x = 0; x < this.total.length; x++) {
				const income = (repState.incomePeriod[ x ] > 0 ? repState.incomePeriod[ x ] : this.FORECAST_INCOME);
				if (x >= 1) {
					this.accumulatedBalance[ x ] = this.total[x] > 0 ? (income - this.total[ x ]) + this.accumulatedBalance[ x - 1 ] : 0;
				} else {
					this.accumulatedBalance[x] = this.total[x] > 0 ? income - this.total[ x ] : 0;
				}
				this.balance[x] = income - this.total[x];
			}
		});
	}

	ngOnDestroy() {
		this.store.dispatch(new ResetBudgets());
	}

	loadBudgetData() {
		if (+this.reportForm.get('budget').value > 0) {
			this.store.dispatch(new ListCategoryAggregValues(+this.reportForm.get('budget').value));
		} else {
			this.store.dispatch(new ShowAlertError('Please select a budget'));
		}
	}

	isActual(date: Date) {
		return new Date(date).getTime() <= new Date().getTime();
	}
}
