import { BudgetCategory } from './budget-category.model';
import { User } from './user.model';

export class Budget {
	constructor(public id: number, public user: User, public startDate: Date,
		public endDate: Date, public categories: BudgetCategory[]) { }
}
