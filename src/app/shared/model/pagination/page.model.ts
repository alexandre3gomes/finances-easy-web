import { Pageable } from './pageable.model';
import { Sort } from './sort.model';

export class Page {

	constructor(public content: any[], public pageable: Pageable, public last: boolean, public totalPages: number,
		public totalElements: number, public size: number, public number: number,
		public numberOfElements: number, public first: boolean, public sort: Sort,
		public empty: boolean) { }
}
