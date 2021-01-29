import { User } from './user.model';

export class Income {
    constructor(public id: number,
        public user: User,
        public name: string,
        public value: number,
        public date: Date,
        public description: string) { }
}
