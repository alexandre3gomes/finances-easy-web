import { Expense } from '../../../shared/model/expense.model';
import { Income } from '../../../shared/model/income.model';
import { CategoryAggregValues } from '../../../shared/model/report/category-aggreg-values.model';
import { DashboardActions, DashboardActionsEnum } from './dashboard.actions';

export interface DashboardState {
	incomes: Income[];
	expenses: Expense[];
	categories: CategoryAggregValues[];
	dataFetched: boolean;
}

export const initialDashboardState: DashboardState = {
	incomes: [],
	expenses: [],
	categories: [],
	dataFetched: false
};

export function dashboardReducers(state = initialDashboardState, action: DashboardActions): DashboardState {
	switch (action.type) {
		case (DashboardActionsEnum.ADD_ACTUAL_INCOMES): {
			return {
				...state,
				incomes: action.payload
			};
		}
		case (DashboardActionsEnum.ADD_ACTUAL_EXPENSES): {
			return {
				...state,
				expenses: action.payload
			};
		}
		case (DashboardActionsEnum.ADD_ACTUAL_CATEGORIES): {
			return {
				...state,
				categories: action.payload
			};
		}
		case (DashboardActionsEnum.DATA_FETCHED): {
			return {
				...state,
				dataFetched: true
			};
		}
		case (DashboardActionsEnum.RESET_DATA): {
			return {
				...state,
				incomes: initialDashboardState.incomes,
				expenses: initialDashboardState.expenses,
				categories: initialDashboardState.categories,
				dataFetched: false
			};
		}
		default: {
			return state;
		}
	}
}
