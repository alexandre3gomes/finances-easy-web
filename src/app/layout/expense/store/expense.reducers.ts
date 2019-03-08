import { Expense } from '../../../shared/model/expense.model';
import { ExpenseActions, ExpenseActionsEnum } from './expense.actions';

export interface ExpenseState {
	expenses: Expense[];
}

export const initialExpenseState: ExpenseState = {
	expenses: []
};

export function expenseReducers (state = initialExpenseState, action: ExpenseActions): ExpenseState {
	switch (action.type) {
		case (ExpenseActionsEnum.CREATE_EXPENSE): {
			return {
				...state,
				expenses: [ ...state.expenses, action.payload ]
			};
		}
		case (ExpenseActionsEnum.SET_EXPENSES): {
			return {
				...state,
				expenses: action.payload
			};
		}
		case (ExpenseActionsEnum.DELETE_EXPENSE): {
			const oldExpenses = [ ...state.expenses ];
			oldExpenses.splice(oldExpenses.indexOf(oldExpenses.find((exp) => exp.id === action.payload)), 1);
			return {
				...state,
				expenses: oldExpenses
			};
		}
		default: {
			return state;
		}
	}
}
