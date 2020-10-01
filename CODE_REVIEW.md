1. There is no unsubscription to store in book-search component.It will increment the subscriptions every time the component loaded and it causes perfomance issues, memory leaks as well.
2. Instead of subscribing in ts files, assign observable and use async pipe in html. It will handle unsubscription when component is destroyed. Implmented this change in book.search component.
3. Objects declaration should strongly typed.
4. Naming conventions could be more clear.