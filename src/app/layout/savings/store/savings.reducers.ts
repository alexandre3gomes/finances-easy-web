import { Default } from '../../../shared/enum/default.enum';
import { Page } from '../../../shared/model/pagination/page.model';
import { Savings } from '../../../shared/model/savings.model';
import { SavingsActions, SavingsActionsEnum } from './savings.actions';

export interface SavingsState {
	savings: Savings[];
	page: Page;
}

export const initialSavingsState: SavingsState = {
	savings: [],
	page: null
};

export function savingsReducers(state = initialSavingsState, action: SavingsActions): SavingsState {
	switch (action.type) {
		case (SavingsActionsEnum.RESET_SAVINGS): {
			return {
				...state,
				savings: initialSavingsState.savings,
				page: initialSavingsState.page
			};
		}
		case (SavingsActionsEnum.ADD_SAVINGSS): {
			return {
				...state,
				savings: [...state.savings, ...action.payload.content].sort((sav1, sav2) => new Date(sav2.date).getTime() - new Date(sav1.date).getTime()),
				page: action.payload
			};
		}
		case (SavingsActionsEnum.ADD_SAVINGS): {
			const newSavingss = [...state.savings];
			if(newSavingss.length >= Default.PAGE_SIZE) {
				newSavingss.pop();
			}
			return {
				...state,
				savings: [action.payload, ...newSavingss].sort((sav1, sav2) => new Date(sav2.createdDate).getTime() - new Date(sav1.createdDate).getTime())
			};
		}
		case (SavingsActionsEnum.ALTER_SAVINGS): {
			const newSavingss = [...state.savings];
			return {
				...state,
				savings: newSavingss.sort((sav1, sav2) => new Date(sav2.createdDate).getTime() - new Date(sav1.createdDate).getTime())
			};
		}
		case (SavingsActionsEnum.REMOVE_SAVINGS): {
			const newSavingss = [...state.savings];
			const deletedSavings = newSavingss.filter((elem) => elem.id === action.payload);
			newSavingss.splice(newSavingss.indexOf(deletedSavings[0]), 1);
			return {
				...state,
				savings: newSavingss
			};
		}
		default: {
			return state;
		}
	}
}
