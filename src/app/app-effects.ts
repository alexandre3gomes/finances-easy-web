import { AuthEffects } from './auth/store/auth.effects';
import { IncomeEffects } from './layout/income/store/income.effects';
import { CategoryEffects } from './layout/category/store/category.effects';
import { ExpenseEffects } from './layout/expense/store/expense.effects';
import { BudgetEffects } from './layout/budget/store/budget.effects';
import { DashboardEffects } from './layout/dashboard/store/dashboard.effects';
import { ReportEffects } from './layout/report/store/report.effects';
import { UserEffects } from './layout/user/store/user.effects';
import { SavingsEffects } from './layout/savings/store/savings.effects';

export const effects = [
    AuthEffects,
    IncomeEffects,
    CategoryEffects,
    ExpenseEffects,
    BudgetEffects,
    DashboardEffects,
    ReportEffects,
    UserEffects,
    SavingsEffects
];
