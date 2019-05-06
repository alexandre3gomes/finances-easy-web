import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { routerTransition } from '../../router.animations';
import { DateLocaleFilterPipe } from '../../shared/pipes/date-locale-filter.pipe';
import { AppState } from '../../store/app.reducers';
import { dashboard } from '../../store/app.selectors';
import { ListActualExpenses, ListActualIncomes, ResetData } from './store/dashboard.actions';
import { DashboardState } from './store/dashboard.reducers';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	animations: [ routerTransition() ]
})
export class DashboardComponent implements OnInit, OnDestroy {

	public state = this.store.select(dashboard);
	public showChart = false;
	public pieChartOptions = {
		responsive: true,
		legend: {
			position: 'top',
		}
	};
	public pieChartLabels = [];
	public pieChartData: number[] = [];
	public pieChartType = 'pie';
	public pieChartLegend = true;
	public totalIncome = 0;

	constructor(public store: Store<AppState>, public dateLocale: DateLocaleFilterPipe) { }

	ngOnInit () {
		this.store.dispatch(new ListActualExpenses());
		this.store.dispatch(new ListActualIncomes());
		this.state.subscribe((dashboardState: DashboardState) => {
			const grouped = dashboardState.expenses.reduce((mapped, exp) => {
				mapped[ exp.category.name ] = (mapped[ exp.category.name ] || 0) + (exp.value);
				return mapped;
			}, {});
			Object.keys(grouped).forEach(cat => {
				this.pieChartLabels.push(cat);
				this.pieChartData.push(grouped[ cat ]);
			});
			this.totalIncome = dashboardState.incomes.reduce((inc, inc1) => inc + inc1.value, 0);
		});
		setTimeout(() => this.showChart = true, 500);
	}

	ngOnDestroy () {
		this.store.dispatch(new ResetData());
	}
}
