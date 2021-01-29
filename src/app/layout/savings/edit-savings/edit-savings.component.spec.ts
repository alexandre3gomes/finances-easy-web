import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { EditSavingsComponent } from './edit-savings.component';
import { appReducers, clearState } from '../../../store/app.reducers';
import { SavingsModule } from '../savings.module';

describe('EditSavingsComponent', () => {
    let component: EditSavingsComponent;
    let fixture: ComponentFixture<EditSavingsComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    SavingsModule,
                    RouterTestingModule,
                    TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } }),
                    StoreModule.forRoot(appReducers, { metaReducers: [clearState] })

                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(EditSavingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
