import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared';


const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
	{
		path: '',
		loadChildren: ()=> import('./layout/layout.module').then(m => m.LayoutModule),
		canActivate: [AuthGuard]
	},
	{ path: '**', redirectTo: 'not-found' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
