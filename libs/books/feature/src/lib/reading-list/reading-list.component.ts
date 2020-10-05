import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReadingListItem } from '@tmo/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnDestroy {
  readingList$ = this.store.select(getReadingList);
  public snackBarSubscription$: Subscription;

  constructor(
    private readonly store: Store,
    private snackBar: MatSnackBar
  ) {}

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.openSnackBar(item);
  }

  openSnackBar(item: ReadingListItem) {
    const snackBarRef = this.snackBar.open(item.title + ' is removed from list', 'Undo');
    this.snackBarSubscription$ = snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({ book: {...item, id: item.bookId} }));
    })
  }

  ngOnDestroy(): void {
    this.snackBarSubscription$.unsubscribe();
  }
}
