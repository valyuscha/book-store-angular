import {ICartBook, IDefaultBook} from 'interfaces';

export function getCurrentBook(addedBooks: {[key: number]: ICartBook}, activeBook: IDefaultBook): [string, ICartBook][] {
  return addedBooks ? Object.entries<ICartBook>(addedBooks)
    .filter((book) => {
      if (+book[0] === +activeBook.id) return book;
      return
    }) : [];
}
