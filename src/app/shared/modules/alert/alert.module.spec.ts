import { AlertModule } from './alert.module';

describe('AlertModule', () => {
	let llertModule: AlertModule;

	beforeEach(() => {
		llertModule = new AlertModule();
	});

	it('should create an instance', () => {
		expect(llertModule).toBeTruthy();
	});
});
