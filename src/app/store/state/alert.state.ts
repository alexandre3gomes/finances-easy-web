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
