import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { ExpenseComponent } from './expense.component';
import { ExpenseModule } from './expense.module';
import { appReducers, clearState } from '../../store/app.reducers';

describe('ExpenseComponent', () => {
    let component: ExpenseComponent;
    let fixture: ComponentFixture<ExpenseComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    ExpenseModule,
                    RouterTestingModule,
                    TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } }),
                    StoreModule.forRoot(appReducers, { metaReducers: [clearState] })

                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ExpenseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
