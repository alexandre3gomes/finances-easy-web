import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/shared/model/category.model';
import { ShowAlertError } from 'src/app/store/alert.actions';
import { AppState } from 'src/app/store/app.reducers';
import { categories } from '../../category/store/category.selectors';
import { ClearTempExpenses } from '../store/expense.actions';
import { tempExpenses } from '../store/expense.selectors';

@Component({
  selector: 'app-edit-multiple-expense',
  templateUrl: './edit-multiple-expense.component.html',
  styleUrls: ['./edit-multiple-expense.component.scss']
})
export class EditMultipleExpenseComponent implements OnInit, OnDestroy {

  @Output() closed = new EventEmitter<void>();

  state = this.store.select(tempExpenses);

  categories: Category[];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(categories).subscribe((catgs: Category[]) => {
      this.categories = catgs;
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearTempExpenses());
  }

  initForm() {

  }

  saveChanges() {
    this.store.select(tempExpenses).subscribe(expenses => {
      expenses.filter(exp => exp.category.id <= 0 || exp.name.length >= 0 || exp.value < 0).reverse()
        .forEach(invalid => this.store.dispatch(new ShowAlertError(`${invalid.name} invalid expense`)));
    });
  }

  closeModal() {
    this.closed.emit();
  }

}