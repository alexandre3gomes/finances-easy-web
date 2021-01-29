import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryAggregComponent } from './category-aggreg/category-aggreg.component';
import { ReportComponent } from './report.component';
import { YearBalanceComponent } from './year-balance/year-balance.component';

const routes: Routes = [
    {
        path: '',
        component: ReportComponent
    },
    {
        path: 'category',
        component: CategoryAggregComponent
    },
    {
        path: 'balance',
        component: YearBalanceComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule { }
