import { Category } from '../category.model';
import { PeriodValue } from './period-value.model';

export class CategoryAggregValues {
	constructor(public category: Category, public periodValue: PeriodValue[]) { }
}
