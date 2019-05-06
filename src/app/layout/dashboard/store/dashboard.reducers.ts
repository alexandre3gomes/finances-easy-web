import { Expense } from '../../../shared/model/expense.model';
import { Income } from '../../../shared/model/income.model';
import { DashboardActions, DashboardActionsEnum } from './dashboard.actions';

export interface DashboardState {
	incomes: Income[];
	expenses: Expense[];
}

export const initialDashboardState: DashboardState = {
	incomes: [],
	expenses: []
};

export function dashboardReducers (state = initialDashboardState, action: DashboardActions): DashboardState {
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
		case (DashboardActionsEnum.RESET_DATA): {
			return {
				...state,
				incomes: initialDashboardState.incomes,
				expenses: initialDashboardState.expenses
			};
		}
		default: {
			return state;
		}
	}
}
