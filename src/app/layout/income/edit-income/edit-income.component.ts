import {
 Component, EventEmitter, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { authLoggedUser } from '../../../auth/store/auth.selectors';
import { Income } from '../../../shared/model/income.model';
import { User } from '../../../shared/model/user.model';
import { AppState } from '../../../store/app.reducers';
import { CreateIncome, UpdateIncome } from '../store/income.actions';
import { incomes } from '../store/income.selectors';

@Component({
    selector: 'app-edit-income',
    templateUrl: './edit-income.component.html'
})
export class EditIncomeComponent implements OnInit, OnDestroy {
    modalVisible = false;

    incomeForm: FormGroup;

    @Input() currentId: number;

    @Output() closed = new EventEmitter<void>();

    constructor(private store: Store<AppState>) { }

    ngOnInit () {
        this.initForm();
    }

    ngOnDestroy () {
        this.currentId = -1;
    }

    saveChanges () {
        const createdDate = this.incomeForm.get('createdDate').value;
        if (typeof createdDate.setHours === 'function') {
            createdDate.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
        }
        let editedIncome: Income;
        if (this.currentId > 0) {
            this.store.select(incomes).subscribe((incomeState: Income[]) => {
                editedIncome = incomeState.find((inc: Income) => inc.id === this.currentId);
            });
            if (editedIncome) {
                editedIncome.name = this.incomeForm.get('name').value;
                editedIncome.description = this.incomeForm.get('description').value;
                editedIncome.value = this.incomeForm.get('value').value;
                editedIncome.date = createdDate;
                this.store.dispatch(new UpdateIncome(editedIncome));
            }
            this.closed.emit();
        } else {
            let loggedUser: User;
            this.store.select(authLoggedUser).subscribe((user: User) => {
                loggedUser = user;
            });
            this.store.dispatch(
                new CreateIncome(new Income(-1,
                    loggedUser,
                    this.incomeForm.get('name').value,
                    this.incomeForm.get('value').value,
                    createdDate,
                    this.incomeForm.get('description').value))
);
            this.closed.emit();
        }
    }

    initForm () {
        let name = '';
        let description = '';
        let value;
        let createdDate = new Date();
        if (this.currentId > 0) {
            this.store.select(incomes).subscribe((incs: Income[]) => {
                const income = incs.find((inc: Income) => inc.id === this.currentId);
                if (income) {
                    name = income.name;
                    description = income.description;
                    value = income.value;
                    createdDate = income.date;
                }
            });
        }
        this.incomeForm = new FormGroup({
            name: new FormControl(name, Validators.required),
            description: new FormControl(description),
            value: new FormControl(value, Validators.min(0.1)),
            createdDate: new FormControl(createdDate, Validators.required)
        });
    }

    closeModal () {
        this.closed.emit();
    }
}
