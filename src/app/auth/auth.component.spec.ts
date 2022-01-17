import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreModule } from "@ngrx/store";
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { AuthComponent } from './auth.component';
import { AuthModule } from './auth.module';
import { appReducers, clearState } from '../store/app.reducers';
import { oktaConfig } from '../app.module';

describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AuthModule,
                RouterTestingModule,
                BrowserAnimationsModule,
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
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
