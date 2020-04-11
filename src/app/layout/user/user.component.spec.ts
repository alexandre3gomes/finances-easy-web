import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { UserComponent } from './user.component';
import { UserModule } from './user.module';
import { StoreModule } from '@ngrx/store';
import { appReducers, clearState } from '../../store/app.reducers';

describe('UserComponent', () => {
	let component: UserComponent;
	let fixture: ComponentFixture<UserComponent>;

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
		fixture = TestBed.createComponent(UserComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
