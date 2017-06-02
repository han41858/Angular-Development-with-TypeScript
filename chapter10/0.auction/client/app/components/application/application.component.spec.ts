import ApplicationComponent from './application.component';

describe('ApplicationComponent', () => {
	it('is successfully instantiated', () => {
		const app = new ApplicationComponent();
		expect(app instanceof ApplicationComponent).toEqual(true);
	});
});