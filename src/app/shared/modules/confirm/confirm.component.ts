import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html'
})
export class ConfirmComponent {

	@Input() msg: string;
	@Input() visible: boolean;
	@Output() result = new EventEmitter<boolean>();

	confirm() {
		this.result.emit(true);
		this.visible = false;
	}

	cancel() {
		this.result.emit(false);
		this.visible = false;
	}
}
