import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbDateLocaleAdapter } from '../../shared/utils/ngb-date-locale.adapter';
import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetComponent } from './budget.component';
import { EditBudgetComponent } from './edit-budget/edit-budget.component';



@NgModule({
	imports: [
		CommonModule,
		BudgetRoutingModule,
		FormsModule,
		NgbModalModule,
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
		}),
		TranslateModule,
		ReactiveFormsModule,
		NgbDatepickerModule
	],
	declarations: [ BudgetComponent, EditBudgetComponent ],
	providers: [ { provide: NgbDateAdapter, useClass: NgbDateLocaleAdapter } ]
})
export class BudgetModule { }
