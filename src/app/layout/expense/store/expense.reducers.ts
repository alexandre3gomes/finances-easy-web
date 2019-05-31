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
		case (ExpenseActionsEnum.ADD_EXPENSE): {
			const newExpenses = [ ...state.expenses ];
			newExpenses.pop();
			return {
				...state,
				expenses: [ action.payload, ...newExpenses ]
			};
		}
		case (ExpenseActionsEnum.ALTER_EXPENSE): {
			const newExpenses = [ ...state.expenses ];
			return {
				...state,
				expenses: newExpenses.sort((exp1, exp2) => new Date(exp2.expireAt).getTime() - new Date(exp1.expireAt).getTime())
			};
		}
		case (ExpenseActionsEnum.REMOVE_EXPENSE): {
			const newExpenses = [ ...state.expenses ];
			const deletedExpense = newExpenses.filter((elem) => elem.id = action.payload);
			newExpenses.splice(newExpenses.indexOf(deletedExpense[ 0 ]), 1);
			return {
				...state,
				expenses: newExpenses
			};
		}
		default: {
			return state;
		}
	}
}
