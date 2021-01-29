import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { SavingsComponent } from './savings.component';
import { appReducers, clearState } from '../../store/app.reducers';

describe('SavingsComponent', () => {
    let component: SavingsComponent;
    let fixture: ComponentFixture<SavingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } }),
                StoreModule.forRoot(appReducers, { metaReducers: [clearState] })
            ],
            declarations: [SavingsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SavingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
