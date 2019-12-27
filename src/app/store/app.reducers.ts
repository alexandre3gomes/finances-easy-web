import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { authReducers, AuthState, initialAuthState } from '../auth/store/auth.reducers';
import { budgetReducers, BudgetState, initialBudgetState } from '../layout/budget/store/budget.reducers';
import { categoryReducers, CategoryState, initialCategoryState } from '../layout/category/store/category.reducers';
import { dashboardReducers, DashboardState, initialDashboardState } from '../layout/dashboard/store/dashboard.reducers';
import { expenseReducers, ExpenseState, initialExpenseState } from '../layout/expense/store/expense.reducers';
import { incomeReducers, IncomeState, initialIncomeState } from '../layout/income/store/income.reducers';
import { initialReportState, reportReducers, ReportState } from '../layout/report/store/report.reducers';
import { alertReducers, AlertState, initialAlertState } from './alert.reducers';
import { AppActionsEnum } from './app.actions';
import { UserState, initialUserState, userReducers } from '../layout/user/store/user.reducers';


export interface AppState {
	router?: RouterReducerState;
	alert: AlertState;
	auth: AuthState;
	income: IncomeState;
	category: CategoryState;
	expense: ExpenseState;
	budget: BudgetState;
	dashboard: DashboardState;
	report: ReportState;
	user: UserState;
}

export const initialAppState: AppState = {
	alert: initialAlertState,
	auth: initialAuthState,
	income: initialIncomeState,
	category: initialCategoryState,
	expense: initialExpenseState,
	budget: initialBudgetState,
	dashboard: initialDashboardState,
	report: initialReportState,
	user: initialUserState
};

export function getInitialState (): AppState {
	return initialAppState;
}

export const appReducers: ActionReducerMap<AppState, any> = {
	router: routerReducer,
	alert: alertReducers,
	auth: authReducers,
	income: incomeReducers,
	category: categoryReducers,
	expense: expenseReducers,
	budget: budgetReducers,
	dashboard: dashboardReducers,
	report: reportReducers,
	user: userReducers
};

export function clearState (reducer) {
	return function (state, action) {
		if (action.type === AppActionsEnum.CLEAR_STORE) {
			state = undefined;
		}
		return reducer(state, action);
	};
}
