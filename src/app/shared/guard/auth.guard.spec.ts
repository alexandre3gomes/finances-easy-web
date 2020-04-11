import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';
import { StoreModule } from '@ngrx/store';
import { appReducers, clearState } from '../../store/app.reducers';

describe('AuthGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				StoreModule.forRoot(appReducers, { metaReducers: [ clearState ] })
			],
			providers: [ AuthGuard ]
		});
	});

	it('should ...', inject([ AuthGuard ], (guard: AuthGuard) => {
		expect(guard).toBeTruthy();
	}));
});
