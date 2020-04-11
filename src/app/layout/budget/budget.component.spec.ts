import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetComponent } from './budget.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { appReducers, clearState } from '../../store/app.reducers';
import { StoreModule } from '@ngrx/store';


describe('BudgetComponent', () => {
	let component: BudgetComponent;
	let fixture: ComponentFixture<BudgetComponent>;

	beforeEach(async(() => {
		const initialState = {};
		TestBed.configureTestingModule({
			declarations: [ BudgetComponent ],
			imports: [
				TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } }),
				StoreModule.forRoot(appReducers, { metaReducers: [ clearState ] })
			],
			schemas: [ NO_ERRORS_SCHEMA ]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BudgetComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
