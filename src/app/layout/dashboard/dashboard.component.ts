import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { routerTransition } from '../../router.animations';
import { BarChart } from '../../shared/model/charts/bar-chart.model';
import { PieChart } from '../../shared/model/charts/pie-chart.model';
import { CategoryAggregValues } from '../../shared/model/report/category-aggreg-values.model';
import { DateLocaleFilterPipe } from '../../shared/pipes/date-locale-filter.pipe';
import { AppState } from '../../store/app.reducers';
import { dashboard } from '../../store/app.selectors';
import { FetchData, ResetData } from './store/dashboard.actions';
import { DashboardState } from './store/dashboard.reducers';


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	animations: [ routerTransition() ]
})
export class DashboardComponent implements OnInit, OnDestroy {

	public state = this.store.select(dashboard);
	public showChart = false;
	public pieChart = new PieChart();
	public barChart = new BarChart();
	public totalIncome = 0;
	public totalExpense = 0;
	public totalPlanned = 0;

	constructor(public store: Store<AppState>, public dateLocale: DateLocaleFilterPipe) { }

	ngOnInit () {
		this.store.dispatch(new FetchData());
		this.state.subscribe((dashboardState: DashboardState) => {
			const grouped = dashboardState.expenses.reduce((mapped, exp) => {
				mapped[ exp.category.name ] = (mapped[ exp.category.name ] || 0) + (exp.value);
				return mapped;
			}, {});
			if (this.pieChart.chartData.length === 0) {
				Object.keys(grouped).forEach(cat => {
					this.pieChart.addChartLabel(cat);
					this.pieChart.addChartData(grouped[ cat ]);
				});
			}
			this.totalIncome = dashboardState.incomes.reduce((inc, inc1) => inc + inc1.value, 0);
			this.totalExpense = dashboardState.expenses.reduce((exp, exp1) => exp + exp1.value, 0);
			this.totalPlanned = dashboardState.categories.reduce((cat, cat1) => cat + cat1.periodValue[ 0 ].plannedValue, 0);
			const plannedValues = [];
			const actualValues = [];
			if (this.barChart.chartLabels.length === 0) {
				dashboardState.categories.forEach((catVal: CategoryAggregValues) => {
					this.barChart.addChartLabel(catVal.category.name);
					plannedValues.push(catVal.periodValue[ 0 ].plannedValue);
					actualValues.push(catVal.periodValue[ 0 ].actualValue);
				});
				if (plannedValues.length > 0 && actualValues.length > 0) {
					this.barChart.addChartData({ data: plannedValues, label: 'Planned' });
					this.barChart.addChartData({ data: actualValues, label: 'Actual' });
				}
			}
		});
	}

	ngOnDestroy () {
		this.store.dispatch(new ResetData());
	}
}
