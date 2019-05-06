import { createSelector } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import { ReportState } from './report.reducers';

const reportState = (state: AppState) => state.report;

export const catVal = createSelector(
	reportState,
	(state: ReportState) => state.catVal
);
