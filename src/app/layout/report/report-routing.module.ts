import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryAggregComponent } from './category-aggreg/category-aggreg.component';
import { ReportComponent } from './report.component';

const routes: Routes = [
	{
		path: '',
		component: ReportComponent
	},
	{
		path: 'category',
		component: CategoryAggregComponent
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class ReportRoutingModule { }
