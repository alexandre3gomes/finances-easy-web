import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedPipesModule } from '../../shared';
import { ConfirmModule } from '../../shared/modules/confirm/confirm.module';
import { NgbDateLocaleAdapter } from '../../shared/utils/ngb-date-locale.adapter';
import { EditIncomeComponent } from './edit-income/edit-income.component';
import { IncomeComponent } from './income.component';
import { IncomeRoutingModule } from './income.routing.module';




@NgModule({
	declarations: [ IncomeComponent, EditIncomeComponent ],
	imports: [ CommonModule,
		IncomeRoutingModule,
		TranslateModule,
		ReactiveFormsModule,
		ConfirmModule,
		NgbDatepickerModule,
		SharedPipesModule
	],
	providers: [ { provide: NgbDateAdapter, useClass: NgbDateLocaleAdapter } ]
})
export class IncomeModule { }
