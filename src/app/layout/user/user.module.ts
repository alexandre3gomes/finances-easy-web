import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserRoutingModule } from './user.routing.module';
import { ConfirmModule } from '../../shared/modules/confirm/confirm.module';
import { AlertModule } from '../../shared/modules/alert/alert.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserComponent, EditUserComponent],
  imports: [
	CommonModule,
	UserRoutingModule,
	ConfirmModule,
	AlertModule,
	TranslateModule,
	ReactiveFormsModule
  ]
})
export class UserModule { }
