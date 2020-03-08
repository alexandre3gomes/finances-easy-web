import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxCurrencyModule } from 'ngx-currency';

import { SharedPipesModule } from '../../shared';
import { ConfirmModule } from '../../shared/modules/confirm/confirm.module';
import { NgbDateLocaleAdapter } from '../../shared/utils/ngb-date-locale.adapter';
import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetComponent } from './budget.component';
import { EditBudgetComponent } from './edit-budget/edit-budget.component';



@NgModule({
	imports: [
		CommonModule,
		BudgetRoutingModule,
		FormsModule,
		TranslateModule,
		ReactiveFormsModule,
		NgbDatepickerModule,
		SharedPipesModule,
		ConfirmModule,
		NgxCurrencyModule
	],
	declarations: [ BudgetComponent, EditBudgetComponent ],
	providers: [ { provide: NgbDateAdapter, useClass: NgbDateLocaleAdapter } ]
})
export class BudgetModule { }
