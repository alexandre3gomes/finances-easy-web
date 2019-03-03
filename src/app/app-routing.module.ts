import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared';

const routes: Routes = [
	{
		path: '',
		loadChildren: './layout/layout.module#LayoutModule',
		canActivate: [AuthGuard]
	},
	{ path: 'login', loadChildren: './auth/auth.module#AuthModule' },
	{
		path: 'error',
		loadChildren: './server-error/server-error.module#ServerErrorModule'
	},
	{
		path: 'access-denied',
		loadChildren: './access-denied/access-denied.module#AccessDeniedModule'
	},
	{
		path: 'not-found',
		loadChildren: './not-found/not-found.module#NotFoundModule'
	},
	{ path: '**', redirectTo: 'not-found' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
