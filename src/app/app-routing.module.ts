import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OktaAuthGuard, OktaCallbackComponent} from '@okta/okta-angular';
import {AuthComponent} from './auth/auth.component';


const routes: Routes = [
	{
		path: 'login',
		component: AuthComponent
	},
	{
		path: 'callback',
		component: OktaCallbackComponent,
		pathMatch: 'full'
	},
	{
		path: '',
		loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
		canActivate: [OktaAuthGuard]
	},
	{path: '**', redirectTo: 'not-found'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
