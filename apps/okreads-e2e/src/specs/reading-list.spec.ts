import { $, $$, browser, ExpectedConditions, by, element} from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should be able to undo action after clicking remove button', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('phython');
    await form.submit();

    const wantToReadButton = element.all(by.buttonText('Want to Read'));
    await wantToReadButton.get(0).click();

    const items = await $$('[data-testing="book-item"]');
    
    expect(items.length).toBeGreaterThan(1);

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    let readingListitems = await $$('[data-testing="reading-list-item"]');
    const readingListitemsLength = readingListitems.length;
    const removeListButton = await $('[data-testing="remove-list-button"]');
    await removeListButton.click();
    await browser.wait(ExpectedConditions.elementToBeClickable(element(by.buttonText('Undo')))).then(() =>
    {
      element(by.buttonText('Undo')).click();
    })
    readingListitems = await $$('[data-testing="reading-list-item"]');
    expect(readingListitems.length).toEqual(readingListitemsLength);

  });
});
