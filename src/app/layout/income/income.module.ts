import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ConfirmComponent } from '../components/confirm/confirm.component';
import { IncomeComponent } from './income.component';
import { IncomeRoutingModule } from './income.routing.module';


@NgModule({
	declarations: [IncomeComponent, ConfirmComponent],
	imports: [CommonModule, IncomeRoutingModule, TranslateModule, ReactiveFormsModule]
})
export class IncomeModule { }
