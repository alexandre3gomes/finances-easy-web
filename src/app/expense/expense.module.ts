import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseRoutingModule } from './expense.routing.module';
import { ExpenseComponent } from './expense.component';

@NgModule({
  declarations: [
	  ExpenseComponent
  ],
  imports: [
	CommonModule,
	ExpenseRoutingModule
  ]
})
export class ExpenseModule { }
