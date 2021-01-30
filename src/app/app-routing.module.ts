import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
    },
    {
        path: 'callback',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule),
        canActivate: [OktaAuthGuard]
    },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
