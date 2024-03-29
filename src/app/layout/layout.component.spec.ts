import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { LayoutComponent } from './layout.component';
import { LayoutModule } from './layout.module';
import { appReducers, clearState } from '../store/app.reducers';
import { oktaConfig } from '../app.module';

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    LayoutModule,
                    RouterTestingModule,
                    TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } }),
                    StoreModule.forRoot(appReducers, { metaReducers: [clearState] }),
                    OktaAuthModule
                ],
                providers: [
                    {
                        provide: OKTA_CONFIG,
                        useValue: oktaConfig
                    }
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
