import { ExpenseModule } from './expense.module';

describe('ExpenseModule', () => {
	let expenseModule: ExpenseModule;

	beforeEach(() => {
		expenseModule = new ExpenseModule();
	});

	it('should create an instance', () => {
		expect(expenseModule).toBeTruthy();
	});
});
