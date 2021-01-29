import { Filter } from './filter.model';

export class Pagination {
    private _filter: Filter;

    constructor(public page: number, public size: number) { }

    get filter() {
        return this._filter;
    }

    set filter(filter: Filter) {
        this._filter = filter;
    }
}
