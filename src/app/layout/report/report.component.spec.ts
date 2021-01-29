import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { ReportComponent } from './report.component';
import { ReportModule } from './report.module';
import { appReducers, clearState } from '../../store/app.reducers';

describe('ReportComponent', () => {
    let component: ReportComponent;
    let fixture: ComponentFixture<ReportComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    ReportModule,
                    RouterTestingModule,
                    TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } }),
                    StoreModule.forRoot(appReducers, { metaReducers: [clearState] })

                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
