import { User } from './user.model';

export class Income {
	constructor(
		public id: number,
		public user: User,
		public name: string,
		public value: number
	) {
		this.id = id;
		this.user = user;
		this.name = name;
		this.value = value;
	}
}
