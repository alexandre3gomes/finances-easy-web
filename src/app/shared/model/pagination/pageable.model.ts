import { Sort } from './sort.model';

export class Pageable {
    constructor(public sort: Sort, public offset: number, public pageSize: number,
        publicNumber: number, public upaged: boolean, public paged: boolean) { }
}
