import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ConfirmComponent } from './confirm.component';
import { ConfirmModule } from './confirm.module';
import { StoreModule } from '@ngrx/store';
import { appReducers, clearState } from '../../../store/app.reducers';

describe('ConfirmComponent', () => {
	let component: ConfirmComponent;
	let fixture: ComponentFixture<ConfirmComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [
					ConfirmModule,
					RouterTestingModule,
					TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } }),
					StoreModule.forRoot(appReducers, { metaReducers: [ clearState ] })

				]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ConfirmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
