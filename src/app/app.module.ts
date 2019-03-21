import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthEffects } from './auth/store/auth.effects';
import { BudgetEffects } from './layout/budget/store/budget.effects';
import { CategoryEffects } from './layout/category/store/category.effects';
import { ExpenseEffects } from './layout/expense/store/expense.effects';
import { IncomeEffects } from './layout/income/store/income.effects';
import { AuthGuard } from './shared';
import { HeaderInterceptor } from './shared/interceptors/header.interceptor';
import { appReducers } from './store/app.reducers';



// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

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
				deps: [ HttpClient ]
			}
		}),
		NgbDropdownModule,
		NgxUiLoaderModule,
		StoreModule.forRoot(appReducers),
		EffectsModule.forRoot([ AuthEffects, IncomeEffects, CategoryEffects, ExpenseEffects, BudgetEffects ]),
		StoreRouterConnectingModule.forRoot({ stateKey: '[Router]' }),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		AppRoutingModule
	],
	declarations: [ AppComponent ],
	providers: [
		AuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HeaderInterceptor,
			multi: true
		}
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
