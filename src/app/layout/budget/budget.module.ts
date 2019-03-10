import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetComponent } from './budget.component';


@NgModule({
	imports: [
		CommonModule,
		BudgetRoutingModule
	],
	declarations: [BudgetComponent]
})
export class BudgetModule { }
