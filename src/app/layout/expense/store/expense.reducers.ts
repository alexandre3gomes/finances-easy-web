import { Expense } from '../../../shared/model/expense.model';
import { Page } from '../../../shared/model/pagination/page.model';
import { ExpenseActions, ExpenseActionsEnum } from './expense.actions';

export interface ExpenseState {
	expenses: Expense[];
	page: Page;
}

export const initialExpenseState: ExpenseState = {
	expenses: [],
	page: null
};

export function expenseReducers (state = initialExpenseState, action: ExpenseActions): ExpenseState {
	switch (action.type) {
		case (ExpenseActionsEnum.RESET_EXPENSES): {
			return {
				...state,
				expenses: initialExpenseState.expenses,
				page: initialExpenseState.page
			};
		}
		case (ExpenseActionsEnum.ADD_EXPENSES): {
			return {
				...state,
				expenses: [ ...state.expenses, ...action.payload.content ],
				page: action.payload
			};
		}
		default: {
			return state;
		}
	}
}
