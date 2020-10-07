import { $, $$, browser, ExpectedConditions, by, element } from 'protractor';

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

  it('Then: I should be able to mark book as finished reading', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('machine learning');
    await form.submit();

    const wantToReadButton = element.all(by.buttonText('Want to Read'));
    await wantToReadButton.get(0).click();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    const markToFinishButton = await $('[data-testing="mark-to-finish-reading-button"]');
    await markToFinishButton.click();

    const markedAsFinishedButton = await $$('[data-testing="marked-as-finish-reading-button"]');
    expect(markedAsFinishedButton.length).toBeGreaterThanOrEqual(1);

    const finishedReadingDetails = await $$('[data-testing="finished-reading-details"]');
    expect(finishedReadingDetails.length).toBeGreaterThanOrEqual(1);
  });
});
