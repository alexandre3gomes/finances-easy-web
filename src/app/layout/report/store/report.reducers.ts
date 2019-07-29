import { CategoryAggregValues } from '../../../shared/model/report/category-aggreg-values.model';
import { ReportActions, ReportActionsEnum } from './report.actions';

export interface ReportState {
	catVal: CategoryAggregValues[];
	incomePeriod: Array<number>;
}

export const initialReportState: ReportState = {
	catVal: [],
	incomePeriod: []
};

export function reportReducers(state = initialReportState, action: ReportActions): ReportState {
	switch (action.type) {
		case (ReportActionsEnum.ADD_CATEGORY_AGGREG_VALUE): {
			return {
				...state,
				catVal: action.payload
			};
		}
		case (ReportActionsEnum.ADD_INCOME_PERIOD): {
			return {
				...state,
				incomePeriod: action.payload
			};
		}
		default: {
			return state;
		}
	}
}
