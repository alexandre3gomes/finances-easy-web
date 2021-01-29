import { User } from './user.model';

export class Savings {
    constructor(public id: number,
        public user: User,
        public description: string,
        public value: number,
        public createdDate: Date) { }
}
