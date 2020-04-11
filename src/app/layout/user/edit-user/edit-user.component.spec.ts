import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { EditUserComponent } from './edit-user.component';
import { StoreModule } from '@ngrx/store';
import { appReducers, clearState } from '../../../store/app.reducers';
import { UserModule } from '../user.module';

describe('EditUserComponent', () => {
	let component: EditUserComponent;
	let fixture: ComponentFixture<EditUserComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [
					UserModule,
					RouterTestingModule,
					TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } }),
					StoreModule.forRoot(appReducers, { metaReducers: [ clearState ] })

				]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(EditUserComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
