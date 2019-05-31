import { Budget } from '../../../shared/model/budget/budget.model';
import { Page } from '../../../shared/model/pagination/page.model';
import { BudgetActions, BudgetActionsEnum } from './budget.actions';

export interface BudgetState {
	budgets: Budget[];
	page: Page;
}

export const initialBudgetState: BudgetState = {
	budgets: [],
	page: null
};

export function budgetReducers(state = initialBudgetState, action: BudgetActions): BudgetState {
	switch (action.type) {
		case (BudgetActionsEnum.RESET_BUDGETS): {
			return {
				...state,
				budgets: initialBudgetState.budgets,
				page: initialBudgetState.page
			};
		}
		case (BudgetActionsEnum.ADD_BUDGETS): {
			return {
				...state,
				budgets: [...state.budgets, ...action.payload.content],
				page: action.payload
			};
		}
		case (BudgetActionsEnum.ADD_BUDGET): {
			const newBudgets = [...state.budgets];
			newBudgets.pop();
			return {
				...state,
				budgets: [action.payload, ...newBudgets]
			};
		}
		case (BudgetActionsEnum.ALTER_BUDGET): {
			const newBudgets = [...state.budgets];
			return {
				...state,
				budgets: newBudgets.sort((bud1, bud2) => new Date(bud2.startDate).getTime() - new Date(bud1.startDate).getTime())
			};
		}
		case (BudgetActionsEnum.REMOVE_BUDGET): {
			const newBudgets = [...state.budgets];
			const deletedBudget = newBudgets.filter((elem) => elem.id === action.payload);
			newBudgets.splice(newBudgets.indexOf(deletedBudget[0]), 1);
			return {
				...state,
				budgets: newBudgets
			};
		}
		default: {
			return state;
		}
	}
}
