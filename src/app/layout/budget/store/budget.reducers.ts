import { CalendarEvent } from 'calendar-utils';
import { Budget } from '../../../shared/model/budget/budget.model';
import { BudgetActions, BudgetActionsEnum } from './budget.actions';

export interface BudgetState {
	budgets: Budget[];
	events: CalendarEvent[];
}

export const initialBudgetState: BudgetState = {
	budgets: [],
	events: []
};

export function budgetReducers (state = initialBudgetState, action: BudgetActions): BudgetState {
	switch (action.type) {
		case (BudgetActionsEnum.RESET_BUDGETS): {
			return {
				...state,
				events: initialBudgetState.events
			};
		}
		case (BudgetActionsEnum.ADD_BUDGETS): {
			return {
				...state,
				budgets: [ ...state.budgets, ...action.payload.content ]
			};
		}
		default: {
			return state;
		}
	}
}
