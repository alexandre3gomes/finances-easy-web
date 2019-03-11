import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModule } from '../../shared/modules/confirm/confirm.module';
import { IncomeComponent } from './income.component';
import { IncomeRoutingModule } from './income.routing.module';
import { EditIncomeComponent } from './edit-income/edit-income.component';



@NgModule({
	declarations: [ IncomeComponent, EditIncomeComponent ],
	imports: [ CommonModule, IncomeRoutingModule, TranslateModule, ReactiveFormsModule, ConfirmModule ]
})
export class IncomeModule { }
