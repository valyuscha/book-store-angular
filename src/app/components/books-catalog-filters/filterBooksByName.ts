import {IDefaultBook} from 'interfaces';

export const filterBooksByName = (value: string, books: IDefaultBook[]) => {
  if (value.trim()) {
    const filteredBooks: IDefaultBook[] = []

    books.filter(book => {
      if (book.title.toLowerCase().startsWith(value.toLowerCase().trim())) {
        filteredBooks.push(book)
      }
    })

    return filteredBooks
  } else {
    return books
  }
}
