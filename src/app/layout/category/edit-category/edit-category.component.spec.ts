import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { EditCategoryComponent } from './edit-category.component';
import { StoreModule } from '@ngrx/store';
import { appReducers, clearState } from '../../../store/app.reducers';
import { CategoryModule } from '../category.module';

describe('EditCategoryComponent', () => {
	let component: EditCategoryComponent;
	let fixture: ComponentFixture<EditCategoryComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [
					CategoryModule,
					RouterTestingModule,
					TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } }),
					StoreModule.forRoot(appReducers, { metaReducers: [ clearState ] })

				]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(EditCategoryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
