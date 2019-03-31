import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { authReducers, AuthState, initialAuthState } from '../auth/store/auth.reducers';
import { budgetReducers, BudgetState, initialBudgetState } from '../layout/budget/store/budget.reducers';
import { categoryReducers, CategoryState, initialCategoryState } from '../layout/category/store/category.reducers';
import { expenseReducers, ExpenseState, initialExpenseState } from '../layout/expense/store/expense.reducers';
import { incomeReducers, IncomeState, initialIncomeState } from '../layout/income/store/income.reducers';
import { alertReducers, AlertState, initialAlertState } from './alert.reducers';


export interface AppState {
	router?: RouterReducerState;
	alert: AlertState;
	auth: AuthState;
	income: IncomeState;
	category: CategoryState;
	expense: ExpenseState;
	budget: BudgetState;
}

export const initialAppState: AppState = {
	alert: initialAlertState,
	auth: initialAuthState,
	income: initialIncomeState,
	category: initialCategoryState,
	expense: initialExpenseState,
	budget: initialBudgetState
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
	budget: budgetReducers
};
