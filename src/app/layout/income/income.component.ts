import { OnInit, Component } from '@angular/core';

@Component({
	selector: 'app-income',
	templateUrl: './income.component.html'
})
export class IncomeComponent implements OnInit {

	show: boolean;

	constructor() {}

	ngOnInit() {

	}

	create() {
		this.show = true;
	}

}
