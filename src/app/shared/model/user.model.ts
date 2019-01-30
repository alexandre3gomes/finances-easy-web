export class User {
	constructor(
		public id: number,
		public name: string,
		public username: string,
		public password: string,
		public token: string
	) {
		this.id = id;
		this.name = name;
		this.username = username;
		this.password = password;
		this.token = token;
	}
}
