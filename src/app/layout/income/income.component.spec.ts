import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { IncomeComponent } from './income.component';
import { IncomeModule } from './income.module';
import { StoreModule } from '@ngrx/store';
import { appReducers, clearState } from '../../store/app.reducers';

describe('IncomeComponent', () => {
	let component: IncomeComponent;
	let fixture: ComponentFixture<IncomeComponent>;

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
		fixture = TestBed.createComponent(IncomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
