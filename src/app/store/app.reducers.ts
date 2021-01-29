import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { authReducers, AuthState, initialAuthState } from '../auth/store/auth.reducers';
import { budgetReducers, BudgetState, initialBudgetState } from '../layout/budget/store/budget.reducers';
import { categoryReducers, CategoryState, initialCategoryState } from '../layout/category/store/category.reducers';
import { dashboardReducers, DashboardState, initialDashboardState } from '../layout/dashboard/store/dashboard.reducers';
import { expenseReducers, ExpenseState, initialExpenseState } from '../layout/expense/store/expense.reducers';
import { incomeReducers, IncomeState, initialIncomeState } from '../layout/income/store/income.reducers';
import { initialReportState, reportReducers, ReportState } from '../layout/report/store/report.reducers';
import { initialSavingsState, savingsReducers, SavingsState } from '../layout/savings/store/savings.reducers';
import { initialUserState, userReducers, UserState } from '../layout/user/store/user.reducers';
import { alertReducers, AlertState, initialAlertState } from './alert.reducers';
import { AppActionsEnum } from './app.actions';

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
    savings: SavingsState;
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
    user: initialUserState,
    savings: initialSavingsState
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
    user: userReducers,
    savings: savingsReducers
};

export function clearState (reducer) {
    return function (state, action) { // eslint-disable-line
        if (action.type === AppActionsEnum.CLEAR_STORE) {
            state = undefined; // eslint-disable-line
        }
        return reducer(state, action);
    };
}
