import { OnInit, Component } from '@angular/core';
import { Income } from 'src/app/shared/model/income.model';
import { User } from 'src/app/shared/model/user.model';
import { USerService } from 'src/app/shared/services/user.service';
import { IncomeService } from './income.service';

@Component({
	selector: 'app-income',
	templateUrl: './income.component.html'
})
export class IncomeComponent implements OnInit {

	income = new Income(undefined, undefined, '', 0);

	constructor(private userServ: USerService, private incService: IncomeService) {}

	ngOnInit() {
		this.userServ.current().subscribe( (us: User) => this.income.user = us);
	}

	saveChanges() {
		this.incService.create(this.income).subscribe( inc => {
			this.income = inc;
		},
		error => console.log(error));
	}
}
