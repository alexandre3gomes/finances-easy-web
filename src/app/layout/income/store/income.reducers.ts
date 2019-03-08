import { Income } from '../../../shared/model/income.model';
import { IncomeActions, IncomeActionsEnum } from './income.actions';

export interface IncomeState {
	incomes: Income[];
}

export const initialIncomeState: IncomeState = {
	incomes: []
};

export function incomeReducers (state = initialIncomeState, action: IncomeActions): IncomeState {
	switch (action.type) {
		case (IncomeActionsEnum.CREATE_INCOME): {
			return {
				...state,
				incomes: [ ...state.incomes, action.payload ]
			};
		}
		case (IncomeActionsEnum.SET_INCOMES): {
			return {
				...state,
				incomes: action.payload
			};
		}
		case (IncomeActionsEnum.DELETE_INCOME): {
			const oldIncomes = [ ...state.incomes ];
			oldIncomes.splice(oldIncomes.indexOf(oldIncomes.find((inc) => inc.id === action.payload)), 1);
			return {
				...state,
				incomes: oldIncomes
			};
		}
		default: {
			return state;
		}
	}
}
