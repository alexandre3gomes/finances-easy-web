import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedPipesModule } from '../../shared';
import { ConfirmModule } from '../../shared/modules/confirm/confirm.module';
import { NgbDateLocaleAdapter } from '../../shared/utils/ngb-date-locale.adapter';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { ExpenseComponent } from './expense.component';
import { ExpenseRoutingModule } from './expense.routing.module';

@NgModule({
	declarations: [ ExpenseComponent, EditExpenseComponent ],
	imports: [ CommonModule,
		ExpenseRoutingModule,
		TranslateModule,
		ReactiveFormsModule,
		ConfirmModule,
		NgbDatepickerModule,
		SharedPipesModule
	],
	providers: [ { provide: NgbDateAdapter, useClass: NgbDateLocaleAdapter } ]
})
export class ExpenseModule { }
