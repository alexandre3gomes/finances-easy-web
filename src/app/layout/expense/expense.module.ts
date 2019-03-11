import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModule } from '../../shared/modules/confirm/confirm.module';
import { ExpenseComponent } from './expense.component';
import { ExpenseRoutingModule } from './expense.routing.module';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';

@NgModule({
	declarations: [ ExpenseComponent, EditExpenseComponent ],
	imports: [ CommonModule, ExpenseRoutingModule, TranslateModule, ReactiveFormsModule, ConfirmModule ]
})
export class ExpenseModule { }
