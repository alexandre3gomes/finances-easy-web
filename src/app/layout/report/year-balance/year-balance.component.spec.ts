import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { YearBalanceComponent } from './year-balance.component';
import { appReducers, clearState } from '../../../store/app.reducers';

describe('YearBalanceComponent', () => {
    let component: YearBalanceComponent;
    let fixture: ComponentFixture<YearBalanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } }),
                StoreModule.forRoot(appReducers, { metaReducers: [clearState] })
            ],
            declarations: [YearBalanceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YearBalanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
