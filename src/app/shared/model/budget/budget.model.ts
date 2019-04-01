import { BudgetCategory } from '../budget-category.model';
import { User } from '../user.model';
import { Breakpoint } from './breakpoing.model';

export class Budget {
	constructor(public id: number, public user: User, public startDate: Date,
		public endDate: Date, public breakpoint: Breakpoint, public categories: BudgetCategory[]) { }
}
