import { BasicCliPage } from './app.po';

describe('basic-cli App', () => {
  let page: BasicCliPage;

  beforeEach(() => {
    page = new BasicCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
