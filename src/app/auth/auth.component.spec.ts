import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthComponent } from './auth.component';
import { AuthModule } from './auth.module';

describe('LoginComponent', () => {
	let component: AuthComponent;
	let fixture: ComponentFixture<AuthComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				AuthModule,
				RouterTestingModule,
				BrowserAnimationsModule,
			],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
