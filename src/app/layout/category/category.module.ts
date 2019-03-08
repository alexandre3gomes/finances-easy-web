import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModule } from '../../shared/modules/confirm/confirm.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';

@NgModule({
	declarations: [ CategoryComponent ],
	imports: [ CommonModule, CategoryRoutingModule, TranslateModule, ReactiveFormsModule, ConfirmModule ]
})
export class CategoryModule { }
