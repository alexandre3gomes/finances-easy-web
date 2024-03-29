import { CommonModule, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import localeEn from '@angular/common/locales/en-GB';
import localePt from '@angular/common/locales/pt-PT';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { DefaultRouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';

import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { effects } from './app-effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderInterceptor } from './shared/interceptors/header.interceptor';
import { appReducers, clearState } from './store/app.reducers';

registerLocaleData(localeEn, 'en');
registerLocaleData(localePt, 'pt');

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

export const customCurrencyMaskConfig = {
    align: 'left',
    allowNegative: true,
    allowZero: true,
    decimal: ',',
    precision: 2,
    prefix: '€ ',
    suffix: '',
    thousands: '.',
    nullable: true
};

export const oktaConfig = environment.okta;

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        NgbDropdownModule,
        NgxUiLoaderModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
        StoreModule.forRoot(appReducers, {
            metaReducers: [clearState],
            runtimeChecks: { strictActionImmutability: false, strictStateImmutability: false }
        }),
        EffectsModule.forRoot(effects),
        StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer, stateKey: '[Router]' }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        AppRoutingModule,
        OktaAuthModule
    ],
    declarations: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true
        },
        {
            provide: LOCALE_ID,
            useFactory: (translate: TranslateService) => translate.getBrowserLang(),
            deps: [TranslateService]
        },
        {
            provide: OKTA_CONFIG,
            useValue: oktaConfig
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
