import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared';


const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{ path: 'login', loadChildren: './auth/auth.module#AuthModule' },
	{
		path: '',
		loadChildren: './layout/layout.module#LayoutModule',
		canActivate: [AuthGuard]
	},
	{ path: '**', redirectTo: 'not-found' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
