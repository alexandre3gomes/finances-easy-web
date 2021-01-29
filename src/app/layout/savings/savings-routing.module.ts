import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SavingsComponent } from './savings.component';

const routes: Routes = [{ path: '', component: SavingsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SavingsRoutingModule { }
