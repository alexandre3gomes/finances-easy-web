import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/shared/model/category.model';
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
    this.state.subscribe(exp => console.log(exp));
  }

  closeModal() {
    this.closed.emit();
  }

}