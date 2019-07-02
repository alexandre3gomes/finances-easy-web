import { Category } from '../category.model';

export class Filter {
	constructor(public startDate: Date, public endDate: Date, public category: Category) { }
}
