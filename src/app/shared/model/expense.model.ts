import { Category } from './category.model';
import { User } from './user.model';

export class Expense {
	constructor(public id: number,
		public name: string,
		public category: Category,
		public user: User,
		public value: number,
		public expireAt: Date) { }
}
