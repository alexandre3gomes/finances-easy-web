import { AlertState, initialAlertState } from '../state/alert.state';
import { AlertActionsEnum, AlertActions } from '../actions/alert.actions';

export const alertReducers = (
	state = initialAlertState,
	action: AlertActions
): AlertState => {
	switch (action.type) {
		case AlertActionsEnum.GetAlert: {
			return {
				...state
			};
		}
		case AlertActionsEnum.ShowAlertSucess: {
			return {
				...state,
				visible: true,
				msg: action.payload,
				error: false
			};
		}
		case AlertActionsEnum.ShowAlertError: {
			return {
				...state,
				visible: true,
				msg: action.payload,
				error: true
			};
		}
		case AlertActionsEnum.HideAlert: {
			return {
				...state,
				...alert,
				visible: false,
				msg: ''
			};
		}
		default:
			return state;
	}
};
