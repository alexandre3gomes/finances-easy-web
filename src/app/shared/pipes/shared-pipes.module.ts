import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DateLocaleFilterPipe } from './date-locale-filter.pipe';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ DateLocaleFilterPipe ],
	exports: [ DateLocaleFilterPipe ]
})
export class SharedPipesModule { }
