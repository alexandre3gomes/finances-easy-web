import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ActivatedRoute } from '@angular/router';
import { Default } from '../../shared/enum/default.enum';
import { Category } from '../../shared/model/category.model';
import { Filter } from '../../shared/model/pagination/filter.model';
import { Pagination } from '../../shared/model/pagination/pagination.model';
import { User } from '../../shared/model/user.model';
import { ShowAlertError } from '../../store/alert.actions';
import { AppState } from '../../store/app.reducers';
import { expense } from '../../store/app.selectors';
import { ListCategories, ResetCategories } from '../category/store/category.actions';
import { categories } from '../category/store/category.selectors';
import { ListUsers, ResetUsers } from '../user/store/user.actions';
import { users } from '../user/store/user.selectors';
import { DeleteExpense, ListExpenses, ResetExpenses } from './store/expense.actions';

@Component({
    selector: 'app-expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit, OnDestroy {
    state = this.store.select(expense);

    currentId: number;

    showConfirm = false;

    categories: Category[];

    users: User[];

    editModal = false;

    currentPage = 0;

    DATE_FORMAT = 'L';

    searchForm: FormGroup;

    showFilters = false;

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.store.dispatch(new ListExpenses(new Pagination(this.currentPage, Default.PAGE_SIZE)));
        this.store.dispatch(new ListCategories(new Pagination(Default.START_PAGE, Default.MAX_SIZE)));
        this.store.dispatch(new ListUsers(new Pagination(Default.START_PAGE, Default.MAX_SIZE)));
        this.store.select(categories).subscribe((catgs: Category[]) => {
            this.categories = catgs;
        });
        this.store.select(users).subscribe((usrs) => {
            this.users = usrs;
        });
        this.searchForm = new FormGroup({
            name: new FormControl(),
            startDate: new FormControl(),
            endDate: new FormControl(),
            category: new FormControl(),
            user: new FormControl()
        });
    }

    ngOnDestroy() {
        this.resetData();
        this.store.dispatch(new ResetCategories());
        this.store.dispatch(new ResetExpenses());
        this.store.dispatch(new ResetUsers());
    }

    openModal() {
        this.editModal = true;
    }

    resetData() {
        this.showConfirm = false;
        this.editModal = false;
        this.currentId = -1;
        this.currentPage = 0;
    }

    editExpense(id: number) {
        this.currentId = id;
        this.openModal();
    }

    deleteExpense(id: number) {
        this.currentId = id;
        this.showConfirm = true;
    }

    confirmDelete(confirm: boolean) {
        if (confirm) {
            this.store.dispatch(new DeleteExpense(this.currentId));
        }
        this.resetData();
    }

    showMore() {
        this.currentPage++;
        this.store.dispatch(new ListExpenses(this.getPaginationWithFilters()));
    }

    search() {
        if (this.searchForm.get('startDate').value && !this.searchForm.get('endDate').value) {
            this.store.dispatch(new ShowAlertError('Please select End Date'));
        } else {
            this.currentPage = 0;
            this.store.dispatch(new ResetExpenses());
            this.store.dispatch(new ListExpenses(this.getPaginationWithFilters()));
        }
    }

    getPaginationWithFilters(): Pagination {
        const selectedCategory = this.categories.filter((cat) => cat.id === +this.searchForm.get('category').value);
        const filter = new Filter(this.searchForm.get('name').value,
            this.searchForm.get('startDate').value,
            this.searchForm.get('endDate').value, selectedCategory[0],
            +this.searchForm.get('user').value);
        const pagination = new Pagination(this.currentPage, Default.PAGE_SIZE);
        pagination.filter = filter;
        return pagination;
    }
}
