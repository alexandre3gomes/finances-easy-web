import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
			{
				path: 'dashboard',
				loadChildren: './dashboard/dashboard.module#DashboardModule'
			},
			{
				path: 'expense',
				loadChildren: './expense/expense.module#ExpenseModule'
			},
			{
				path: 'income',
				loadChildren: './income/income.module#IncomeModule'
			},
			{
				path: 'category',
				loadChildren: './category/category.module#CategoryModule'
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LayoutRoutingModule { }
