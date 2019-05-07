import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedPipesModule } from '../../shared';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';


@NgModule({
	declarations: [ ReportComponent ],
	imports: [
		CommonModule,
		ReportRoutingModule,
		TranslateModule,
		SharedPipesModule,
		ReactiveFormsModule
	]
})
export class ReportModule { }
