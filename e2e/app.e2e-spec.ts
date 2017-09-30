import { AvaliacaoJoinUiPage } from './app.po';

describe('algamoney-ui App', () => {
  let page: AvaliacaoJoinUiPage;

  beforeEach(() => {
    page = new AvaliacaoJoinUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
