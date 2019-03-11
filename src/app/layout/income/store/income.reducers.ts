import { Income } from '../../../shared/model/income.model';
import { Page } from '../../../shared/model/pagination/page.model';
import { IncomeActions, IncomeActionsEnum } from './income.actions';

export interface IncomeState {
	incomes: Income[];
	page: Page;
}

export const initialIncomeState: IncomeState = {
	incomes: [],
	page: null
};

export function incomeReducers (state = initialIncomeState, action: IncomeActions): IncomeState {
	switch (action.type) {
		case (IncomeActionsEnum.RESET_INCOMES): {
			return {
				...state,
				incomes: initialIncomeState.incomes,
				page: initialIncomeState.page
			};
		}
		case (IncomeActionsEnum.ADD_INCOMES): {
			return {
				...state,
				incomes: [ ...state.incomes, ...action.payload.content ],
				page: action.payload
			};
		}
		default: {
			return state;
		}
	}
}
