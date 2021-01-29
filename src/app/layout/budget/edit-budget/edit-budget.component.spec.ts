import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EditBudgetComponent } from './edit-budget.component';
import { appReducers, clearState } from '../../../store/app.reducers';
import { BudgetModule } from '../budget.module';

describe('EditBudgetComponent', () => {
    let component: EditBudgetComponent;
    let fixture: ComponentFixture<EditBudgetComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    BudgetModule,
                    RouterTestingModule,
                    TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } }),
                    StoreModule.forRoot(appReducers, { metaReducers: [clearState] })

                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(EditBudgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
