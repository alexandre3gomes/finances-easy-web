import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { CategoryAggregValues } from '../../../shared/model/report/category-aggreg-values.model';
import { ReportActionsEnum, ListCategoryAggregValues } from './report.actions';

@Injectable()
export class ReportEffects {
	private reportEndpoint = environment.api.concat('report');

	constructor(private actions: Actions, private http: HttpClient) { }

	@Effect()
	listCategoryAggregValue = this.actions.pipe(
		ofType(ReportActionsEnum.LIST_CATEGORY_AGGREG_VALUE),
		switchMap((action: ListCategoryAggregValues) => {
			return this.http.get(this.reportEndpoint.concat('/byCategory/').concat(action.payload.toString()));
		}),
		map((list: CategoryAggregValues[]) => {
			return {
				type: ReportActionsEnum.ADD_CATEGORY_AGGREG_VALUE,
				payload: list
			};
		})
	);
}
