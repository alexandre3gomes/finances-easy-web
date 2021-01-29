import { Category } from '../category.model';

export class Filter {
    constructor(public name: string, public startDate: Date, public endDate: Date, public category: Category, public user: number) { }
}
