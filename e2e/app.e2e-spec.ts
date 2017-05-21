import { NgTodomvcPage } from './app.po';

describe('ng-todomvc App', () => {
  let page: NgTodomvcPage;

  beforeEach(() => {
    page = new NgTodomvcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
