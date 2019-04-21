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

export function budgetReducers (state = initialBudgetState, action: BudgetActions): BudgetState {
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
				budgets: [ ...state.budgets, ...action.payload.content ],
				page: action.payload
			};
		}
		default: {
			return state;
		}
	}
}
