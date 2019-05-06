import { User } from '../user.model';
import { BudgetCategory } from './budget-category.model';

export class Budget {
	constructor(public id: number, public user: User, public startDate: Date,
		public endDate: Date, public breakperiod: number, public categories: BudgetCategory[]) { }
}
