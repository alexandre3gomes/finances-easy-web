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

export function incomeReducers(state = initialIncomeState, action: IncomeActions): IncomeState {
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
				incomes: [...state.incomes, ...action.payload.content].sort((inc1, inc2) => new Date(inc2.date).getTime() - new Date(inc1.date).getTime()),
				page: action.payload
			};
		}
		case (IncomeActionsEnum.ADD_INCOME): {
			const newIncomes = [...state.incomes];
			newIncomes.pop();
			return {
				...state,
				incomes: [action.payload, ...newIncomes].sort((inc1, inc2) => new Date(inc2.date).getTime() - new Date(inc1.date).getTime())
			};
		}
		case (IncomeActionsEnum.ALTER_INCOME): {
			const newIncomes = [...state.incomes];
			return {
				...state,
				incomes: newIncomes.sort((inc1, inc2) => new Date(inc2.date).getTime() - new Date(inc1.date).getTime())
			};
		}
		case (IncomeActionsEnum.REMOVE_INCOME): {
			const newIncomes = [...state.incomes];
			const deletedIncome = newIncomes.filter((elem) => elem.id === action.payload);
			newIncomes.splice(newIncomes.indexOf(deletedIncome[0]), 1);
			return {
				...state,
				incomes: newIncomes
			};
		}
		default: {
			return state;
		}
	}
}
