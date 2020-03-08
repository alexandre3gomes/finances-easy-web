import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		canActivateChild: [ AuthGuard ],
		children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'expense',
				loadChildren: () => import('./expense/expense.module').then(m => m.ExpenseModule)
			},
			{
				path: 'income',
				loadChildren: () => import('./income/income.module').then(m => m.IncomeModule)
			},
			{
				path: 'category',
				loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
			},
			{
				path: 'budget',
				loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule)
			},
			{
				path: 'report',
				loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
			},
			{
				path: 'user',
				loadChildren: () => import('./user/user.module').then(m => m.UserModule)
			},
			{
				path: 'savings',
				loadChildren: () => import('./savings/savings.module').then(m => m.SavingsModule)
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class LayoutRoutingModule { }
