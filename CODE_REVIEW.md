Improvements:
1. There is no unsubscription to store in book-search component.It will increment the subscriptions every time the component loaded and it causes perfomance issues, memory leaks as well.
2. Instead of subscribing in ts files, assign observable and use async pipe in html. It will handle unsubscription when component is destroyed. Implmented this change in book.search component.
3. Missing few reducers for reading-list. 
4. Found test cases for the reducers which were not declared, fixed test cases by adding the repective reducers.
5. Objects declaration should strongly typed.
6. Naming conventions could be more clear.

Automated scan with the Lighthouse extension issues:
1. Background and foreground colors do not have a sufficient contrast ratio. Fixed 'example message text' on loading page by making sure contrast ratio, font-size and font-weight has met the accessibility rules.
2. Buttons do not have an accessible name. Fixed by adding 'Search' aria-label attribute to meet the accessibility rules.

Manually found accessiblity issues:
1. Buttons doesn’t have aria-label attribute, so added it.
2. Attribute alt is missing image tags, so added accordingly.
3. Added font-size and font-weight to 'Reading-List'button to fix contrast ratio. 
