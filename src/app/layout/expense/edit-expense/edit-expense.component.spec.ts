import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EditExpenseComponent } from './edit-expense.component';
import { appReducers, clearState } from '../../../store/app.reducers';
import { ExpenseModule } from '../expense.module';

describe('EditExpenseComponent', () => {
    let component: EditExpenseComponent;
    let fixture: ComponentFixture<EditExpenseComponent>;

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
        fixture = TestBed.createComponent(EditExpenseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
