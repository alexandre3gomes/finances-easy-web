import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { EditIncomeComponent } from './edit-income.component';
import { StoreModule } from '@ngrx/store';
import { appReducers, clearState } from '../../../store/app.reducers';
import { IncomeModule } from '../income.module';

describe('EditIncomeComponent', () => {
	let component: EditIncomeComponent;
	let fixture: ComponentFixture<EditIncomeComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [
					IncomeModule,
					RouterTestingModule,
					TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } }),
					StoreModule.forRoot(appReducers, { metaReducers: [ clearState ] })

				]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(EditIncomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
