import { AlertActions, AlertActionsEnum } from './alert.actions';

export interface AlertState {
	visible: boolean;
	msg: string;
	error: boolean;
}

export const initialAlertState: AlertState = {
	visible: false,
	msg: '',
	error: false
};

export const alertReducers = (state = initialAlertState, action: AlertActions): AlertState => {
	switch (action.type) {
		case AlertActionsEnum.GET_ALERT: {
			return {
				...state
			};
		}
		case AlertActionsEnum.SHOW_ALERT_SUCESS: {
			return {
				...state,
				visible: true,
				msg: action.payload,
				error: false
			};
		}
		case AlertActionsEnum.SHOW_ALERT_ERROR: {
			return {
				...state,
				visible: true,
				msg: action.payload,
				error: true
			};
		}
		case AlertActionsEnum.HIDE_ALERT: {
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
