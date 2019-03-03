import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
	imports: [
		CommonModule,
		TranslateModule,
		AuthRoutingModule,
		ReactiveFormsModule
	],
	declarations: [AuthComponent]
})
export class AuthModule { }
