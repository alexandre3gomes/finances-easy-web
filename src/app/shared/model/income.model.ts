import { User } from './user.model';

export class Income {
	constructor(
		public id: number,
		public user: User,
		public name: string,
		public value: number,
		public date: Date
	) {
		this.id = id;
		this.user = user;
		this.name = name;
		this.value = value;
		this.date = date;
	}
}
