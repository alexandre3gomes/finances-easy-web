import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseRoutingModule } from './expense.routing.module';
import { ExpenseComponent } from './expense.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [ExpenseComponent],
	imports: [CommonModule, ExpenseRoutingModule, TranslateModule]
})
export class ExpenseModule {}
