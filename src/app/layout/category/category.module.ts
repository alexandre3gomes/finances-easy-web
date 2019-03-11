import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModule } from '../../shared/modules/confirm/confirm.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@NgModule({
	declarations: [ CategoryComponent, EditCategoryComponent ],
	imports: [ CommonModule, CategoryRoutingModule, TranslateModule, ReactiveFormsModule, ConfirmModule, NgbPaginationModule ]
})
export class CategoryModule { }
