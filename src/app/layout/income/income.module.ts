import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeComponent } from './income.component';
import { IncomeRoutingModule } from './income.routing.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
	declarations: [IncomeComponent],
	imports: [CommonModule, IncomeRoutingModule, TranslateModule]
})
export class IncomeModule {}
