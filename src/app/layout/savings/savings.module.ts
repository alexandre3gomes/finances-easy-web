import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { SharedPipesModule } from '../../shared';
import { ConfirmModule } from '../../shared/modules/confirm/confirm.module';
import { NgbDateLocaleAdapter } from '../../shared/utils/ngb-date-locale.adapter';
import { EditSavingsComponent } from './edit-savings/edit-savings.component';
import { SavingsRoutingModule } from './savings-routing.module';
import { SavingsComponent } from './savings.component';


@NgModule({
  declarations: [SavingsComponent, EditSavingsComponent],
  imports: [
    CommonModule,
	SavingsRoutingModule,
	TranslateModule,
	ReactiveFormsModule,
	ConfirmModule,
	NgbDatepickerModule,
	SharedPipesModule
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateLocaleAdapter }]
})
export class SavingsModule { }
