import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { appReducers, clearState } from '../../store/app.reducers';
import { BudgetComponent } from './budget.component';

describe('BudgetComponent', () => {
    let component: BudgetComponent;
    let fixture: ComponentFixture<BudgetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BudgetComponent],
            imports: [
                TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } }),
                StoreModule.forRoot(appReducers, { metaReducers: [clearState] })
            ],
            schemas: [NO_ERRORS_SCHEMA]
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
