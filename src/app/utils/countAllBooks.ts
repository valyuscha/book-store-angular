import {ICartBook} from 'interfaces';

export const countAllBooks = (books: ICartBook[]) => {
  return books.reduce((amount, book) => amount + book.addedCount, 0);
}
